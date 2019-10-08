import os
from flask import Flask


config_variable_name = 'FLASK_CONFIG_PATH'
default_config_path = os.path.join(os.path.dirname(__file__), '../config/local.py')
os.environ.setdefault(config_variable_name, default_config_path)


def init_app(app):
    from .database import db, migrate
    db.init_app(app)
    migrate.init_app(app, db)


def create_app(config_file=None):
    app = Flask(__name__)

    if config_file:
        app.config.from_pyfile(config_file)
    else:
        app.config.from_envvar(config_variable_name)

    init_app(app)

    return app
