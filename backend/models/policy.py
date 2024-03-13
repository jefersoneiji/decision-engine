from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.sql import func

from . import Base

@dataclass
class Policy(Base):
    __tablename__='policies'
    id: int = Column(Integer, primary_key=True)
    title: str = Column(String)
    edges: str = Column(JSON)
    nodes: str = Column(JSON)
    createdAt: DateTime = Column(DateTime(timezone=True), server_default=func.now())

class Edge: 
    id: str
    source: str
    target: str
    label: str
    sourceHandle: str

class NodeData: 
    parameter: str
    operation: str
    value: str
    decision: str

class Node: 
    id: str
    data: NodeData
    type: str
