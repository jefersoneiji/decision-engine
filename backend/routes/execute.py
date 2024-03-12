from flask import Blueprint, request, jsonify
from flask_cors import CORS

execute_policy = Blueprint('execute', __name__, url_prefix='/execute')
cors = CORS(execute_policy, resources={r'/*': {'origins': '*'}})

@execute_policy.route('/', methods=['POST'])
def execute():
    data = request.get_json()
    return jsonify({'response': 'ok'})