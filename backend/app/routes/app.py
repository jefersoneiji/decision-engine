from flask import Flask
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from database import databaseSetup, createDatabaseTables
from routes.execute import execute_policy
from routes.policies import execute_policies
from database import Database, dbTypeInApp

engine = create_engine(databaseSetup.DATABASE_URI)
dbSession = sessionmaker(bind=engine)

createDatabaseTables(dbSession, engine)

app: dbTypeInApp = Flask(__name__)

@app.before_request
def before_request():
    app.db = Database(dbSession)

@app.after_request
def after_request(response):
    app.db.closeConnection()
    return response

app.register_blueprint(execute_policy)
app.register_blueprint(execute_policies)