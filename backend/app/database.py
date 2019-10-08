from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

migrate = Migrate()
db = SQLAlchemy()

Base = declarative_base()


class Device(db.Model):
    __tablename__ = 'devices'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    mac_address = db.Column(db.String(20))
    location = db.Column(db.String(128))
    token = db.Column(db.String(64))
