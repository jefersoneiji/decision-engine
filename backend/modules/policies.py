from .execute import find_by

def contains_only_start_node(data):
    decisions = find_by(elems=data['nodes'], key='type', value='conditional')
    return  decisions == None

def node_data_filled(data):
    for node in data:
        if node["type"] == "conditional":
            for key in node["data"]:
                if str(node["data"][key]).strip() == "" or str(node["data"][key]).strip() == None:
                    return False
    return True