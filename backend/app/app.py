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
                            coordinate_x=get_arg('x'),
                            coordinate_y=get_arg('y')))
    db.session.commit()
    return jsonify({"success": True})


@api.route('/data/report', methods=["POST"])
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

    db.session.add(Data(time=current_time, device=device_id,
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


@api.route('/data/current', methods=["GET", "POST"])
def get_current_data():
    data = {}
    for location in Location.query.all():
        data[location.name] = location.export()
        data[location.name]['devices'] = []
        for device in location.devices:
            data[location.name]['devices'].append(device.export())
    return jsonify({"success": True, "data": data})
