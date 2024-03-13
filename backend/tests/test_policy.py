import pytest
from database import Database
from app import app, dbSession
from .test_policy_utils import createPolicy, checkResponse, getPolicy

db = Database(dbSession)

@pytest.fixture
def client():
    with app.test_client() as client:
        db.clearDatabase()
        yield client

def testPolicy(client):
    # Test creation success
    response = createPolicy(client)
    checkResponse(response, status=201)
    response = getPolicy(client, response.get_json()['id'])
    checkResponse(response, status=200, length=5)

def testGetPolicy(client):
    createPolicy(client)

    # Test fetching non existent policy
    response = getPolicy(client, id=8)
    checkResponse(response, status=404, data={'error': 'Not Found'})