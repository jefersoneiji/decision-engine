import json

def load_mock_data(file_path):
    with open(file_path) as file:
        return json.load(file)

def generate_policy():
    data = load_mock_data('./tests/mockData.json')
    return data

def create_policy(client):
    return client.post('/policies/', json=generate_policy())

def get_policy(client,id):
    return client.get(f'/policies/{id}')

def contains(value):
    def contains_data(data):
        for key in data: 
            if key in value:
                assert data[key] == value[key]
    return contains_data

def check_response(response,status=None, length=None, data=None):
    response_data = response.get_json()
    if status is not None:
        assert response.status_code == status
    if length != None: 
        assert len(response_data) == length
    if data is not None: 
        assert response_data == data
        if length != None:
            assert len(response_data) == length

def delete_policy(client, id):
    return client.delete(f'/policies/{id}')