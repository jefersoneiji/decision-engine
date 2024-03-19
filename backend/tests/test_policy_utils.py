import json
from typing import Any, Callable, Optional

def load_mock_data(file_path):
    with open(file_path) as file:
        return json.load(file)

def generate_policy(policy, modifications=None):
    data = load_mock_data('./tests/mockData.json')[policy]
    if modifications is not None:
        for key in modifications:
            data[key] = modifications[key]
    return data

def create_policy(client, policy='simple'):
    return client.post('/policies/', json=generate_policy(policy))

def get_policy(client,id):
    return client.get(f'/policies/{id}')

def contains(value):
    def contains_data(data):
        for key in data: 
            if key in value:
                assert data[key] == value[key]
    return contains_data

def check_response(response,status=None, length=None, data=None, contains:Optional[Callable[[Any], None]] = None):
    response_data = response.get_json()
    if status is not None:
        assert response.status_code == status
    if length != None: 
        assert len(response_data) == length
    if data is not None: 
        assert response_data == data
        if length != None:
            assert len(response_data) == length
    if contains is not None:
        contains(data=response_data)

def delete_policy(client, id):
    return client.delete(f'/policies/{id}')

def update_policy(client, id, policy="simple", modifications=None):
    return client.put(f'/policies/{id}',json=generate_policy(policy, modifications))