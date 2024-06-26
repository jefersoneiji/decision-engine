import pytest
from database import Database
from app import create_app
from .test_policy_utils import create_policy, check_response
from .test_execute_utils import execute, check_decision

new_app = create_app(test=True)
app = new_app['app']
Session = new_app['Session']

db = Database(Session)

@pytest.fixture
def client():
    with app.test_client() as client:
        db.clear_database()
        yield client

def test_execution(client):
    response = create_policy(client)
    policy_id = response.get_json()['id']

    # Test policy with all right data should work
    response = execute(client, id=policy_id, data={'income': 1005})
    check_response(response, status=200)
    check_decision(response, expected=True)
    
    # Test policy returning false
    response = execute(client, id=policy_id, data={'income': 10})
    check_response(response, status=200)
    check_decision(response, expected=False)

    # Testing missing parameters 
    response = execute(client, id=policy_id, data={})
    check_response(response, status=400, data={'error':'Missing required parameters: income'})
    
    # Testing incorret parameter data
    response = execute(client, id=policy_id, data={"income": -.2})
    check_response(response, status=200)
    check_decision(response, expected=False)
    
    # Testing non existent policy
    response = execute(client, id=555, data={})
    check_response(response, status=404, data={'error':'Not Found'})