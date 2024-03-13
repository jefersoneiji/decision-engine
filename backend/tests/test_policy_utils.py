import json

def loadMockData(filePath):
    with open(filePath) as file:
        return json.load(file)

def generatePolicy():
    data = loadMockData('./tests/mockData.json')
    return data

def createPolicy(client):
    return client.post('/policies/', json=generatePolicy())

def getPolicy(client,id):
    return client.get(f'/policies/{id}')

def checkResponse(response,status=None, length=None):
    responseData = response.get_json()
    if status is not None:
        assert response.status_code == status
    if length != None: 
        assert len(responseData) == length