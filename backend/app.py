from flask import Flask
from routes.execute import execute_policy
app = Flask(__name__)

app.register_blueprint(execute_policy)