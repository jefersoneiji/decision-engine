from flask import Flask
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from database import Config, create_database_tables
from routes.execute import execute_policy
from routes.policies import execute_policies
from database import Database, dbTypeInApp
from routes.error_handlers import register_error_handlers

def create_app(test=False):
    engine = create_engine("sqlite:///policies.test.db" if test else Config.DATABASE_URI)
    dbSession = sessionmaker(bind=engine)

    app: dbTypeInApp = Flask(__name__)
    create_database_tables(dbSession, engine)

    @app.before_request
    def before_request():
        app.db = Database(dbSession)

    @app.after_request
    def after_request(response):
        app.db.close_connection()
        return response

    app.config.from_object(Config)
    app.register_blueprint(execute_policy)
    app.register_blueprint(execute_policies)
    register_error_handlers(app)

    return {'app': app, 'Session': dbSession}