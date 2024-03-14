from flask import Blueprint, jsonify, current_app, request, abort
from flask_cors import CORS
from database import dbTypeInApp
from modules.policies import contains_only_start_node, node_data_filled

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

    try:
        if contains_only_start_node(data):
            abort(400, description='At least one conditional node is required')
        if not node_data_filled(data["nodes"]):
            abort(400, description="Comparions can't have empty fields")
        
        new_policy = app.db.create_policy(title=data['title'], edges=data['edges'], nodes=data['nodes'])
        return jsonify(new_policy), 201
    except KeyError:
        abort(400, description='Missing required arguments')


@execute_policies.route('/<string:id>', methods=['DELETE'])
def delete_policy(id):
    deleted = app.db.delete_policy(id)
    if not deleted:
        abort(404)
    return '',204

