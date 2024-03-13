# Frontend

It's the UI for creating, editing and storing one Policy. 

## Tech used

- React (vite)
- TypeScript
- ReactFlow
- Tailwind
- Framer-Motion

## How to run

```shell
yarn dev
```

## Docs

### Nodes + Edges

On `pages/GraphEditor/Nodes` you can see we currently have 3 node types: Start,
End and Conditional. All of them have no functionality implemented, only visuals
(which can also be changed if you want).

Between two nodes, there is an edge of the type `add-node`, which has a button
that when clicked, opens a Drawer to add a new node between the two.

### Contexts

In the root page we have 3 contexts:

- editor: For UI stuff, for example the Drawer state.
- graph: ReactFlow-related states and functions, to add nodes, zoom graph and
  more.
- policy: Responsible for holding Policy information and related operations such as changing it's own name.

### Utility

We already have pre-existing functions to help you with the graph, for
positioning and also nodes/edges. They are the files: `nodeGeneration.ts` and
`positionNodes.ts`.