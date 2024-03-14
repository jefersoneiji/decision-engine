import pytest
from database import Database
from app import app, dbSession
from .test_policy_utils import create_policy, check_response, get_policy

db = Database(dbSession)

@pytest.fixture
def client():
    with app.test_client() as client:
        db.clear_database()
        yield client

def test_policy(client):
    # Test creation success
    response = create_policy(client)
    check_response(response, status=201)
    response = get_policy(client, response.get_json()['id'])
    check_response(response, status=200, length=5)

def testget_policy(client):
    create_policy(client)

    # Test fetching non existent policy
    response = get_policy(client, id=8)
    check_response(response, status=404, data={'error': 'Not Found'})