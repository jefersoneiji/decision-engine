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

def contains(value):
    def containsData(data):
        for key in data: 
            if key in value:
                assert data[key] == value[key]
    return containsData

def checkResponse(response,status=None, length=None, data=None):
    responseData = response.get_json()
    if status is not None:
        assert response.status_code == status
    if length != None: 
        assert len(responseData) == length
    if data is not None: 
        assert responseData == data
        if length != None:
            assert len(responseData) == length
