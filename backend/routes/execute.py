from flask import Blueprint, request, jsonify

execute_policy = Blueprint('execute', __name__, url_prefix='/execute')

@execute_policy.route('/', methods=['POST'])
def execute():
    data = request.get_json()
    return jsonify({'response': 'ok'})