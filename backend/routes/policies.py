from flask import Blueprint, jsonify, current_app, request, abort
from flask_cors import CORS
from database import dbTypeInApp

execute_policies = Blueprint('policies', __name__, url_prefix='/policies')
cors = CORS(execute_policies, resources={r'/*': {'origins': '*'}})
app: dbTypeInApp = current_app

@execute_policies.route('/', methods=['GET'])
def get_all_policies():
    policies_list = app.db.read_policies()
    return jsonify(policies_list)

@execute_policies.route('/<string:id>', methods=['GET'])
def get_policy(id):
    policy = app.db.read_policy(id)
    if not policy: 
        abort(404)
    return jsonify(policy)

@execute_policies.route('/', methods=['POST'])
def create_policy():
    data  = request.get_json()
    new_policy = app.db.create_policy(title=data['title'], edges=data['edges'], nodes=data['nodes'])
    return jsonify(new_policy), 201

@execute_policies.route('/<string:id>', methods=['DELETE'])
def delete_policy(id):
    deleted = app.db.delete_policy(id)
    if not deleted:
        abort(404)
    return '',204

