def execute(client, id, data):
    return client.post(f'/execute/{id}', json=data)