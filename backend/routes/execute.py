from flask import Blueprint, request, jsonify, current_app, abort
from flask_cors import CORS
from database import dbTypeInApp
from modules.execute import findBy, doDecision, checkMissingParameters

execute_policy = Blueprint('execute', __name__, url_prefix='/execute')
cors = CORS(execute_policy, resources={r'/*': {'origins': '*'}})
app: dbTypeInApp = current_app

@execute_policy.route('/<string:id>', methods=['POST'])
def execute(id):
    data = request.get_json()
    policy = app.db.readPolicy(id)

    missingParameters = checkMissingParameters(data ,policy.nodes)
    if len(missingParameters) != 0:
        abort(400, description=f'Missing required parameters: {", ".join(missingParameters) }')
    
    start = findBy(elems=policy.edges, key='source', value='start')
    startNode = findBy(elems=policy.nodes, key='id', value=start["target"])
    
    result = doDecision(data, policy.edges, policy.nodes, startNode)

    return jsonify({'decision': result})
