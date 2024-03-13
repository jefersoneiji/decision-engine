# Backend

The backend is completely empty and up to you to build.
You can use any tech you think would suit this challenge well.

## PolicyDB

PolicyDB is a SQLite local file responsible for storing `Policies`.

Each Database Entity is located in the `Models` folder.

SQLAlchemy is the choosen SQLClient. All db operations are tied to each respective endpoint in the `Routes` folder. 

## ExecutionEngine

ExecutionEngine code is found under the `modules` folder. 

Each `edge` holds information pointing either to an `end`, `start` or `conditional` node. 

In essence the execution engine navigates from `node to node`, based in each edge `target` and `source` fields.

Each iteration uses recursion to either execute the operation inside the `conditional` node and go to the next node or return one `decision` node. 



### Nodes

There are three types of nodes: 

1. Start: It represents the start of the decision three.
2. Conditional: Executes one comparison operations between variables.
3. End: Holds the decision value. Only two are possible: `True` or `False`.

### Example 

<div align="center">
  <img  alt="policy_diagram" width="250" height="350" src="../policy_diagram.svg">
</div>

## Testing

Pytest is the choosen test runner. For running the test suite execute:

   ```cmd
   yarn test
   ```