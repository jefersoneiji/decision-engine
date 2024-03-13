import pytest
from database import Database
from app import app, dbSession
from .test_policy_utils import createPolicy, checkResponse, getPolicy
from .test_execute_utils import execute

db = Database(dbSession)

@pytest.fixture
def client():
    with app.test_client() as client:
        db.clearDatabase()
        yield client

def test_execution(client):
    response = createPolicy(client)
    policyId = response.get_json()['id']

    # Testing missing parameters 
    response = execute(client, id=policyId, data={})
    checkResponse(response, status=400, data={'error':'Missing required parameters: income'})