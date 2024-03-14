from .execute import find_by

def contains_only_start_node(data):
    decisions = find_by(elems=data['nodes'], key='type', value='conditional')
    return  decisions == None