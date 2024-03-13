from flask import Flask

from models import Base
from models.policy import Policy, Edge, Node

class Database: 
    def __init__(self, Session) -> None:
        self.session = Session()
    
    def readPolicies(self) -> list[Policy]:
        return self.session.query(Policy).all()
    
    def readPolicy(self, id: str) -> list[Policy]:
        return self.session.get(Policy, id)
    
    def createPolicy(self, title: str, edges: list[Edge], nodes:list[Node]) -> Policy:
        newPolicy = Policy(title=title, edges=edges, nodes=nodes)
        self.session.add(newPolicy)
        self.session.commit()
        
        return self.readPolicy(id=newPolicy.id)

    def clearDatabase(self):
        self.session.query(Policy).delete()
        self.session.commit()

    def closeConnection(self, execution=None):
        self.session.close()
        
class databaseSetup:
    DATABASE_URI = 'sqlite:///policies.local.db'
    PORT = 7000
    HOST = 'localhost'


def createDatabaseTables(Session, engine):
    session = Session()
    Base.metadata.create_all(bind=engine)
    session.commit()
    session.close()
    
class dbTypeInApp(Flask):
    db: Database