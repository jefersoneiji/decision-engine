<h1 align="center">
    Vom Challenge
</h1>

<h4 align="center">
    Decision Engine
</h4>

<div align="center">
  <img  alt="policy-diagram" width="250" height="350" src="./policy_diagram.svg">
</div>

## Summary 

This decision engine can generate one final decision based on the user's decision tree. Next, this policy can be stored and executed in the back-end.

## Prerequisites

For this project to run, make sure these software are installed:

- [python](https://www.python.org/downloads/)

- [nodejs](https://nodejs.org/en/download/current)
    
- [pnpm](https://pnpm.io/installation)
    
## Installing

To run locally:
1. Clone this repo
   ```cmd
   git@github.com:jefersoneiji/vom-take-home.git
   ```

2. Install dependencies in your machine
   ```cmd
   yarn install
   ```

3. Start both the front and back-end
    ```cmd
    yarn dev
    ```

## Testing

Execute the following command:
   ```cmd
   yarn test
   ```
## Linting 

```shell
yarn lint
```
## Apps

- [README](./frontend/README.md) | `Frontend`: Contains front-end logic for the policy editor
- [README](./backend/README.md) | `Backend`: Contains back-end logic for the CRUD operations in policies
- [README](./backend/README.md#policydb) | `PolicyDB`: Local database with sqlite and sqlalchemy
- [README](./backend/README.md#executionengine) | `ExecutionEngine`: Responsible for processing and outputing one decision after executing a policy

## Design Decisions 
Turbo is used to reduce the number of steps required for executing commands such as spin up apps in dev mode. 

### Back-End

- For the sake of speed and simplicity. SQLite was choosen as local database engine
- Folders contain file according to their purpose. For instance `routes` only contains API routes. This structure make files predictible
- As a way to provent bugs and enforce code styling `pytest` was added to the project

### Front-End

- Because of its reliability and simplicity `Axios` was chosen as `http-client`
- Most user feedback comes shows as `Toast` notifications from `react-toastify`
- As a way to provent bugs and enforce code styling `eslint` was added to the project
- An [AI assistant](./frontend/README.md) may be helpful in answering user's questions related to docs and help them through problem solving while create policies

Made by Jeferson Eiji ➡️ [Get in touch!](https://www.linkedin.com/in/jeferson-eiji/)
