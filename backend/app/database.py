from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json

migrate = Migrate()
db = SQLAlchemy()


class Device(db.Model):
    __tablename__ = 'devices'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    mac_address = db.Column(db.String(20))
    detailed_location = db.Column(db.String(128))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    location = db.relationship("Location", back_populates="devices")
    token = db.Column(db.String(64))
    ip = db.Column(db.String(20))
    parameters = db.Column(db.String(512))
    parameters_obj = None

    def export(self):
        data: Data = self.get_last_data()
        last_data = "None"

        if data is not None:
            last_data = data.export(False)

        ret = {'name': self.name, 'mac_address': self.mac_address, 'detailed_location': self.detailed_location,
                   'location': self.location.name, 'last_data': last_data}
        return ret

    def get_last_data(self):
        return Data.query.filter_by(device_id=self.id).order_by(Data.time.desc()).first()

    def get_last_12_data(self):
        return Data.query.filter_by(device_id=self.id).order_by(Data.time.desc()).limit(12)

    def get_parameter(self, name: str):
        if self.parameters_obj is None:
            self.parameters_obj = json.loads(self.parameters)
        if name in self.parameters_obj:
            return self.parameters_obj[name]
        else:
            return None

    def set_parameter(self, name: str, value):
        if self.parameters_obj is None:
            self.parameters_obj = json.loads(self.parameters)
        self.parameters_obj[name] = value
        self.parameters = json.dumps(self.parameters_obj)


class Data(db.Model):
    __tablename__ = 'data'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Integer)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.id'))
    device = db.relationship("Device")
    packet_count = db.Column(db.Integer)
    mac_count = db.Column(db.Integer)
    universal_mac_count = db.Column(db.Integer)
    crowdedness = db.Column(db.Integer)

    def export(self, detail: bool):
        ret = {'time': self.time, 'device': self.device_id, 'crowdedness': self.crowdedness}
        if detail:
            ret.update({'packet_count': self.packet_count, 'mac_count': self.mac_count,
                        'universal_mac_count': self.universal_mac_count, 'location': self.device.location_id})
        return ret


class Location(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    abbr_name = db.Column(db.String(128))
    devices = db.relationship("Device", back_populates="location")

    def export(self):
        ret = {'id': self.id, 'name': self.name, "abbr": self.abbr_name}
        return ret
