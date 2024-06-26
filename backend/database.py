from flask import Flask
from  dotenv import dotenv_values
import os

from models import Base
from models.policy import Policy, Edge, Node

config = dotenv_values('.env.local')
HEROKU_PORT = os.environ.get('PORT')
HEROKU_HOST = os.environ.get('HEROKU_HOST')
HEROKU_DATABASE_URI = os.environ.get('HEROKU_DATABASE_URI')

class Database: 
    def __init__(self, Session) -> None:
        self.session = Session()
    
    def read_policies(self) -> list[Policy]:
        return self.session.query(Policy).order_by(Policy.createdAt.desc()).all()
    
    def read_policy(self, id: str) -> list[Policy]:
        return self.session.get(Policy, id)
    
    def create_policy(self, title: str, edges: list[Edge], nodes:list[Node]) -> Policy:
        new_policy = Policy(title=title, edges=edges, nodes=nodes)
        self.session.add(new_policy)
        self.session.commit()
        
        return self.read_policy(id=new_policy.id)

    def delete_policy(self, id: str) ->bool:
        policy = self.session.query(Policy).filter_by(id=id)
        if policy.first() == None:
            return None
        
        policy.delete()
        self.session.commit()
        return not self.policy_exists(id=id)
    
    def policy_exists(self, id: str) -> bool:
        return self.session.get(Policy, id) != None

    def update_policy(self, id: str, title: str, edges: list[Edge], nodes: list[Node]) -> Policy:
        self.session.query(Policy).filter_by(id=id).update({
            'title': title,
            'edges': edges,
            'nodes': nodes,
        }, synchronize_session='fetch')
        self.session.commit()
        
        return self.read_policy(id=id)

    def clear_database(self):
        self.session.query(Policy).delete()
        self.session.commit()

    def close_connection(self, execution=None):
        self.session.close()
        
class Config:
    DATABASE_URI = HEROKU_DATABASE_URI or config['DATABASE_URI']
    PORT = HEROKU_PORT or config['API_PORT'] 
    HOST = HEROKU_HOST or config['HOST']

def create_database_tables(Session, engine):
    session = Session()
    Base.metadata.create_all(bind=engine)
    session.commit()
    session.close()
    
class dbTypeInApp(Flask):
    db: Database