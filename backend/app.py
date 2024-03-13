from flask import Flask
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from database import databaseSetup, create_database_tables
from routes.execute import execute_policy
from routes.policies import execute_policies
from database import Database, dbTypeInApp
from routes.error_handlers import register_error_handlers

engine = create_engine(databaseSetup.DATABASE_URI)
dbSession = sessionmaker(bind=engine)

create_database_tables(dbSession, engine)

app: dbTypeInApp = Flask(__name__)

@app.before_request
def before_request():
    app.db = Database(dbSession)

@app.after_request
def after_request(response):
    app.db.close_connection()
    return response

app.config.from_object(databaseSetup)
app.register_blueprint(execute_policy)
app.register_blueprint(execute_policies)
register_error_handlers(app)