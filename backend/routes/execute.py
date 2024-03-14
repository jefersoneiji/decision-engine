from flask import Blueprint, request, jsonify, current_app, abort
from flask_cors import CORS
from database import dbTypeInApp
from modules.execute import find_by, do_decision, check_missing_parameters

execute_policy = Blueprint('execute', __name__, url_prefix='/execute')
cors = CORS(execute_policy, resources={r'/*': {'origins': '*'}})
app: dbTypeInApp = current_app

@execute_policy.route('/<string:id>', methods=['POST'])
def execute(id):
    data = request.get_json()
    policy = app.db.read_policy(id)
    if not policy:
        abort(404)
        
    missing_parameters = check_missing_parameters(data ,policy.nodes)
    if len(missing_parameters) != 0:
        abort(400, description=f'Missing required parameters: {", ".join(missing_parameters) }')
    
    start = find_by(elems=policy.edges, key='source', value='start')
    start_node = find_by(elems=policy.nodes, key='id', value=start["target"])
    
    result = do_decision(data, policy.edges, policy.nodes, start_node)

    return jsonify({'decision': result})
