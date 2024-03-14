from flask import Flask

from models import Base
from models.policy import Policy, Edge, Node

class Database: 
    def __init__(self, Session) -> None:
        self.session = Session()
    
    def read_policies(self) -> list[Policy]:
        return self.session.query(Policy).all()
    
    def read_policy(self, id: str) -> list[Policy]:
        return self.session.get(Policy, id)
    
    def create_policy(self, title: str, edges: list[Edge], nodes:list[Node]) -> Policy:
        new_policy = Policy(title=title, edges=edges, nodes=nodes)
        self.session.add(new_policy)
        self.session.commit()
        
        return self.read_policy(id=new_policy.id)

    def clear_database(self):
        self.session.query(Policy).delete()
        self.session.commit()

    def close_connection(self, execution=None):
        self.session.close()
        
class databaseSetup:
    DATABASE_URI = 'sqlite:///policies.local.db'
    PORT = 7000
    HOST = 'localhost'


def create_database_tables(Session, engine):
    session = Session()
    Base.metadata.create_all(bind=engine)
    session.commit()
    session.close()
    
class dbTypeInApp(Flask):
    db: Database