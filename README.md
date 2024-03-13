<h1 align="center">
    Vom Challenge
</h1>

<h4 align="center">
    Decision Engine
</h4>

<div align="center">
  <img  alt="woovi-logo" width="250" height="350" src="./policy_diagram.svg">
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

## Apps

- [README](./frontend/README.md) | `Frontend`: Contains front-end logic for the policy editor
- [README](./backend/README.md) | `Backend`: Contains back-end logic for the CRUD operations in policies
- [README](./backend/README.md#policydb) | `PolicyDB`: Local database with sqlite and sqlalchemy
- [README](./backend/README.md#executionengine) | `ExecutionEngine`: Responsible for processing and outputing one decision after executing a policy

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Made by Jeferson Eiji ➡️ [Get in touch!](https://www.linkedin.com/in/jeferson-eiji/)
