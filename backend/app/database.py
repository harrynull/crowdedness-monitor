from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

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

    def export(self):
        ret = {'name': self.name, 'mac_address': self.mac_address, 'detailed_location': self.detailed_location,
               'location': self.location.name, 'last_data': self.get_last_data().export(False)}
        return ret

    def get_last_data(self):
        return Data.query.filter_by(device_id=self.id).order_by(Data.time.desc()).first()


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
    devices = db.relationship("Device", back_populates="location")
    coordinate_x = db.Column(db.Float)
    coordinate_y = db.Column(db.Float)

    def export(self):
        ret = {'name': self.name, 'x': self.coordinate_x, 'y': self.coordinate_y}
        return ret
