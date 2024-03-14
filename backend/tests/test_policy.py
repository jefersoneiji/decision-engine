import pytest
from database import Database
from app import app, dbSession
from .test_policy_utils import create_policy, check_response, get_policy, delete_policy

db = Database(dbSession)

@pytest.fixture
def client():
    with app.test_client() as client:
        db.clear_database()
        yield client

def test_create_policy(client):
    # Test creation success
    response = create_policy(client)
    check_response(response, status=201)
    response = get_policy(client, response.get_json()['id'])
    check_response(response, status=200, length=5)

    # Test creation with missing params
    response = create_policy(client, policy='empty')
    check_response(response, status=400, data={'error':'Missing required arguments'})
    
    # Test creation with missing data fields
    response = create_policy(client, policy='missing_data_fields')
    check_response(response, status=400, data={'error':"Comparions can't have empty fields"})

    # Test creation when only start node is received
    response = create_policy(client, 'only_start_node')
    check_response(response, status=400, data={'error':'At least one conditional node is required'})
    
def test_get_policy(client):
    create_policy(client)

    # Test fetching existent policy
    response = get_policy(client, id=1)
    check_response(response, status=200,length=5)

    # Test fetching non existent policy
    response = get_policy(client, id=8)
    check_response(response, status=404, data={'error': 'Not Found'})

def test_delete_policy(client):
    # Delete existing policy
    create_policy(client)
    response = delete_policy(client, id=1)
    check_response(response, status=204)
    
    # Delete non existing policy
    response = delete_policy(client, id=1)
    check_response(response, status=404, data={'error': 'Not Found'})
