import time

from flask import Blueprint, jsonify, make_response, current_app, request

from app.database import Data, db, Device, Location
from data_analyzer.crowdedness import generate_crowdedness

api = Blueprint('api', __name__)


def check_authorization():
    return get_arg("key") == current_app.config["MASTER_KEY"]


def unauthorized_request():
    return make_response(jsonify({"success": False, "reason": "unauthorized"}), 403)


def get_arg(name: str, default: str = ""):
    return request.values[name] if name in request.values else default


@api.route('/')
def hello():
    return jsonify({"success": True})


@api.route('/manage/register_device', methods=["GET", "POST"])
def register_device():
    if not check_authorization():
        return unauthorized_request()
    # TODO: generate a token
    token = '123'
    db.session.add(Device(mac_address=get_arg('mac_address'),
                          name=get_arg('name'),
                          detailed_location=get_arg('detailed_location'),
                          location_id=get_arg('location_id'),
                          token=token))
    db.session.commit()
    return jsonify({"success": True, "token": token})


@api.route('/manage/register_location', methods=["GET", "POST"])
def register_location():
    if not check_authorization():
        return unauthorized_request()

    db.session.add(Location(name=get_arg('name'),
                            coordinates=get_arg('coordinates')))
    db.session.commit()
    return jsonify({"success": True})


@api.route('/data/report', methods=["GET", "POST"])
def report():
    current_time = int(time.time())
    packet_count = get_arg("packet_count")
    mac_count = get_arg("mac_count")
    universal_mac_count = get_arg("universal_mac_count")
    token = get_arg("token")
    # TODO: get the device id associated with the token, or return error if not found.
    device_id = 1
    # TODO: get location id from the device id
    location_id = 1

    db.session.add(Data(time=current_time, device_id=device_id,
                        packet_count=packet_count, mac_count=mac_count,
                        universal_mac_count=universal_mac_count,
                        crowdedness=generate_crowdedness(packet_count, mac_count, universal_mac_count,
                                                         location_id, current_time)))
    db.session.commit()
    return jsonify({"success": True})


@api.route('/data/export', methods=["GET", "POST"])
def export():
    if not check_authorization():
        return unauthorized_request()
    return jsonify({"success": True, "data": [d.export(True) for d in Data.query.all()]})


# TODO: to optimize, send coordinates only when requested.
@api.route('/data/current', methods=["GET", "POST"])
def get_current_data():
    data = {}
    for location in Location.query.all():
        data[location.name] = location.export()
        data[location.name]['devices'] = []
        for device in location.devices:
            data[location.name]['devices'].append(device.export())
    return jsonify({"success": True, "data": data})


# TODO: get historical/predictive data. Parameters: location_id, from_time, to_time
@api.route('/data/time_range', methods=["GET", "POST"])
def get_data_time_range():
    return jsonify({"success": True, "data": {}})

# Parameter: ip, token. device.ip = ip where device.token = token.
@api.route('/data/ip', methods=["GET", "POST"])
def update_ip():
    device = Device.query.filter_by(token=get_arg("token")).first()
    if device is None:
        return jsonify({"success": False})
    device.ip = get_arg("ip")
    db.session.commit()
    return jsonify({"success": True, "data": {}})


@api.route('/manage/')
def admin():
    # TODO: test cookie to authenticate
    devices = Device.query.all()
    # TODO: should use a template instead. hack for debug purpose

    content = """<style>body{padding:5% 10%;}td{text-align: center;}</style>"""\
              '<table style="width:100%">'
    content += """
    <tr><th>ID</th>
    <th>Location</th>
    <th>Name</th>
    <th>MAC Address</th>
    <th>IP</th>
    <th>Last Reported Data</th>
    </tr>"""
    for device in devices:
        data: Data = device.get_last_data()
        last_data = "None"
        if data is not None:
            from datetime import datetime
            last_data = str.format("{} - {}/{} ({})", data.crowdedness, data.mac_count, data.universal_mac_count,
                                   datetime.utcfromtimestamp(data.time).strftime('%Y-%m-%d %H:%M:%S'))

        content += str.format("<tr><td>{}</td><td>{} - {}</td><td>{}</td><td>{}</td><td>{}</td>"
                              "<td>{}</td></tr>",
                              device.id, device.location.name, device.detailed_location,
                              device.name, device.mac_address, device.ip, last_data)
    content += '</table>'
    return content
