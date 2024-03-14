def execute(client, id, data):
    return client.post(f'/execute/{id}', json=data)

def check_decision(response, expected: bool):
    assert response.get_json()['decision'] == expected