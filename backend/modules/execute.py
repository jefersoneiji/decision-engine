from typing import Union
from models.policy import Edge, Node

def findBy(elems,key: str, value: str) -> Union[Edge, Node]:
    for elem in elems:
        if elem[key] == value:
            return elem
    return None

def compare(data, node: Node):
    parameter = data[node['data']['parameter']]
    operation = node['data']['operation']
    value = node['data']['value']

    if operation == '>':
        return parameter > value
    elif operation == '>=':
        return parameter >= value
    elif operation == '<=':
        return parameter <= value
    elif operation == '<':
        return parameter < value
    elif operation == '=':
        return parameter == value

def findEdgeSource(edges: list[Edge], id: str, label: str):
    for edge in edges:
        if edge['source'] == id and edge['label'] == label:
            return edge
        
def doDecision(data, edges: list[Edge], nodes: list[Node], node: Node):
    if node['type'] == 'conditional':
        result = compare(data, node)
        edge = findEdgeSource(edges, node['id'], 'True' if result else 'False' )
        nextNode = findBy(elems=nodes, key='id', value=edge['target'])
        return doDecision(data, edges, nodes, node=nextNode)
    elif node['type'] == 'end':
        return True if node['data']['decision'] == 'True' else False
        
def checkMissingParameters(data, nodes: list[Node]):
    parameters = []
    missingParameters = []
    for node in nodes:
        if node['type'] == 'conditional':
            parameters.append(node['data']['parameter'])
    for param in parameters:
        try:
            data[param]
        except:
            missingParameters.append(param)
    
    return missingParameters
