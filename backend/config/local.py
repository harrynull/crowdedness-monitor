import pathlib

DEBUG = True
SQLALCHEMY_DATABASE_URI = 'sqlite:///'+str(pathlib.Path(__file__).parent)+'/../var/test.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
MASTER_KEY = 'test'
