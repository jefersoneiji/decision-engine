from flask import Blueprint, jsonify, current_app, request
from database import dbTypeInApp

execute_policies = Blueprint('policies', __name__, url_prefix='/policies')
app: dbTypeInApp = current_app

@execute_policies.route('/', methods=['GET'])
def getAllPolicies():
    policiesList = app.db.readPolicies()
    return jsonify(policiesList)

@execute_policies.route('/', methods=['POST'])
def createPolicy():
    data  = request.get_json()
    newPolicy = app.db.createPolicy(title=data['title'], edges=data['edges'], nodes=data['nodes'])
    return jsonify(newPolicy)

