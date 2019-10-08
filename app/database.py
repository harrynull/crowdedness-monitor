from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import Column, Integer


migrate = Migrate()
db = SQLAlchemy()


