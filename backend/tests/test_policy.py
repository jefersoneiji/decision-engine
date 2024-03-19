import pytest
from database import Database
from app import create_app
from .test_policy_utils import create_policy, check_response, get_policy, delete_policy, update_policy, contains

new_app = create_app(test=True)
app = new_app['app']
Session = new_app['Session']

db = Database(Session)

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
    check_response(response, status=400, data={'error':"Comparisons can't have empty fields"})

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

def test_update_policy(client):
    response = create_policy(client)
    check_response(response, status=201)
    id = response.get_json()['id']

    # Update existing policy
    response = update_policy(client, id, modifications={'title': 'new title'})
    check_response(response, status=200, contains=contains({'title':'new title'}))
    
    # Update non existing policy
    response = update_policy(client, id="455")
    check_response(response, status=404, data={'error': 'Not Found'})

    # Update missing params
    response = update_policy(client, id, policy="empty")
    check_response(response, status=400, data={'error':'Missing required arguments'})

    # Update contains only start node
    response = update_policy(client, id, policy="only_start_node")
    check_response(response, status=400, data={'error':'At least one conditional node is required'})
    
    # Update missing node params
    response = update_policy(client, id, policy="missing_data_fields")
    check_response(response, status=400, data={'error':"Comparisons can't have empty fields"})

