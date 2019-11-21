import time

from flask import Blueprint, jsonify, make_response, current_app, request

from app.crossdomain import crossdomain
from app.database import Data, db, Device, Location
from data_analyzer.crowdedness import generate_crowdedness

api = Blueprint('api', __name__)


def check_authorization():
    return get_arg("key") == current_app.config["MASTER_KEY"]


def unauthorized_request():
    return make_response(jsonify({"success": False, "reason": "unauthorized"}), 403)


def get_arg(name: str, default: str = ""):
    json_obj = request.get_json(silent=True)
    if json_obj is not None and name in json_obj: return json_obj[name]
    return request.values[name] if name in request.values else default


@api.route('/')
def hello():
    return jsonify({"success": True})


# http://127.0.0.1:5000/manage/register_device?key=test&mac_address=123&name=test&detailed_location=2f&location_id=1
@api.route('/manage/register_device', methods=["GET", "POST"])
def register_device():
    if not check_authorization():
        return unauthorized_request()
    import uuid
    token = str(uuid.uuid4())
    db.session.add(Device(mac_address=get_arg('mac_address'),
                          name=get_arg('name'),
                          detailed_location=get_arg('detailed_location'),
                          location_id=get_arg('location_id'),
                          token=token))
    db.session.commit()
    return jsonify({"success": True, "token": token})


# http://127.0.0.1:5000/manage/register_location?key=test&name=test_building&abbr_name=test&coordinates=123,123
@api.route('/manage/register_location', methods=["GET", "POST"])
def register_location():
    if not check_authorization():
        return unauthorized_request()

    db.session.add(Location(name=get_arg('name'), abbr_name=get_arg('abbr_name'),
                            coordinates=get_arg('coordinates')))
    db.session.commit()
    return jsonify({"success": True})


# http://127.0.0.1:5000/data/report?packet_count=10&mac_count=10&universal_mac_count=10&token=123
@api.route('/data/report', methods=["GET", "POST"])
def report():
    current_time = int(time.time())
    packet_count = get_arg("packet_count")
    mac_count = get_arg("mac_count")
    universal_mac_count = get_arg("universal_mac_count")
    token = get_arg("token")
    device = Device.query.filter_by(token=token).first()
    if device is None:
        return jsonify({"success": False})

    data = Data(time=current_time, device_id=device.id,
                packet_count=packet_count, mac_count=mac_count,
                universal_mac_count=universal_mac_count,
                crowdedness=0)
    data.crowdedness = generate_crowdedness(device, data)
    db.session.add(data)
    db.session.commit()
    return jsonify({"success": True})


# http://127.0.0.1/data/export?key=test
@api.route('/data/export', methods=["GET", "POST"])
def export():
    if not check_authorization():
        return unauthorized_request()
    # TODO: filter the data by device_id
    # you need to add a new parameter (get_arg) and change the "Data.query.all()" in the following line.
    return jsonify({"success": True, "data": [d.export(True) for d in Data.query.all()]})


# http://127.0.0.1/data/current
@api.route('/data/current', methods=["GET", "POST"])
@crossdomain(origin='*')
def get_current_data():
    data = []
    for location in Location.query.all():
        location_object = location.export()
        location_object['devices'] = []
        for device in location.devices:
            device_info = {'name': device.name, 'detailed_location': device.detailed_location, 'crowdedness': 0,
                           'last_updated': 0}
            last_data: Data = device.get_last_data()
            if last_data is not None:
                device_info['crowdedness'] = last_data.crowdedness
                device_info['last_updated'] = last_data.time
            location_object['devices'].append(device_info)
        data.append(location_object)
    return jsonify({"success": True, "data": data})


# TODO: get historical/predictive data. Parameters: id, from, to
@api.route('/data/time_range', methods=["GET", "POST"])
@crossdomain(origin='*')
def get_data_time_range():
    data = {}
    for d in Data.query.filter(get_arg('from') <= Data.time, Data.time <= get_arg('to'), Data.device_id == get_arg('id')):
        data[d.time] = d.crowdedness
    return jsonify({"success": True, "data": data})


@api.route('/data/clustering')
@crossdomain(origin='*')
def clustering():
    import json
    return jsonify({"success": True, "data": json.load(open('data_analyzer/clustering.json'))})


# Parameter: ip, token. device.ip = ip where device.token = token.
@api.route('/data/ip', methods=["GET", "POST"])
def update_ip():
    device = Device.query.filter_by(token=get_arg("token")).first()
    if device is None:
        return jsonify({"success": False})
    device.ip = get_arg("ip")
    db.session.commit()
    return jsonify({"success": True, "data": {"ip": device.ip}})


@api.route('/manage/')
def admin():
    if not check_authorization():
       return unauthorized_request()
    # TODO: test cookie to authenticate
    devices = Device.query.all()
    # TODO: should use a template instead. hack for debug purpose

    content = """<style>body{padding:5% 10%;}td{text-align: center;}</style>""" \
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
            import pytz

            last_data = str.format("{} - {}/{} ({})", data.crowdedness, data.mac_count, data.universal_mac_count,
                                   datetime.fromtimestamp(data.time, pytz.timezone('Canada/Eastern')).strftime(
                                       '%Y-%m-%d %H:%M:%S'))

        content += str.format("<tr><td>{}</td><td>{} - {}</td><td>{}</td><td>{}</td><td>{}</td>"
                              "<td>{}</td></tr>",
                              device.id, device.location.name, device.detailed_location,
                              device.name, device.mac_address, device.ip, last_data)

    content += '</table>'
    return content
