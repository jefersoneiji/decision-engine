import pytest
from database import Database
from app import app, dbSession
from .test_policy_utils import create_policy, check_response, get_policy
from .test_execute_utils import execute

db = Database(dbSession)

@pytest.fixture
def client():
    with app.test_client() as client:
        db.clear_database()
        yield client

def test_execution(client):
    response = create_policy(client)
    policy_id = response.get_json()['id']

    # Testing missing parameters 
    response = execute(client, id=policy_id, data={})
    check_response(response, status=400, data={'error':'Missing required parameters: income'})