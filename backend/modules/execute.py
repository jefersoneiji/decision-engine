from typing import Union
from models.policy import Edge, Node

def find_by(elems,key: str, value: str) -> Union[Edge, Node]:
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

def find_edge_source(edges: list[Edge], id: str, label: str):
    for edge in edges:
        if edge['source'] == id and edge['label'] == label:
            return edge
        
def do_decision(data, edges: list[Edge], nodes: list[Node], node: Node):
    if node['type'] == 'conditional':
        result = compare(data, node)
        edge = find_edge_source(edges, node['id'], 'True' if result else 'False' )
        next_node = find_by(elems=nodes, key='id', value=edge['target'])
        return do_decision(data, edges, nodes, node=next_node)
    elif node['type'] == 'end':
        return True if node['data']['decision'] == 'True' else False
        
def check_missing_parameters(data, nodes: list[Node]):
    parameters = []
    missing_parameters = []
    for node in nodes:
        if node['type'] == 'conditional':
            parameters.append(node['data']['parameter'])
    for param in parameters:
        try:
            data[param]
        except:
            missing_parameters.append(param)
    
    return missing_parameters
