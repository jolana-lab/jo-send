# Developer

This document describes how to set up your development environment to build and test.

## Installation

```command
git clone https://github.com/jolana-lab/jo-send.git
cd jo-send
npm ci
```

## Unit tests

You need to write **unit tests**.

- During coding:

  Watching if the implemented codes pass the tests, and writing new tests.

  ```command
  npm run test:watch
  ```

- After coding:

  1. make sure all the tests are passed

     ```command
     npm run test
     ```

  2. Check the test coverage (Tests of **controllers and services** are collected).

     ```command
     npm run test:cov
     ```

## Formatting source code

We use [Prettier](https://prettier.io/), and we follow [TypeScript ESLint](https://typescript-eslint.io/).

You can automatically format your code by running:

```command
npm run lint
```

### VS Code

It will automatically pick up the settings from `.vscode/settings.json`.

## Setup

We provide two development setups:

- **Default**: [Docker compose setup](##docker-compose-setup)
- **Recommended**: [Macos local setup](##macos-local-setup)

### Docker compose setup

Docker compose is the easiest way to setup.

```command
docker compose up
```

That's all. :)

### Macos local setup

This setup is more complicated than the previous one. But it's faster to launch and recompile. We recommend this way.

This setup needs you to install the software on your machine.

1. install the software:

   - [MongoDB Community Edition on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-on-macos)

   - [Redis](https://redis.io/topics/quickstart)

   - [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools#macos--linux)

2. start the software

   - **mongodb**

     ```command
     brew services start mongodb-community@5.0
     ```

   - **redis**

     ```command
     redis-server
     ```

   - **solana localhost**

     ```command
     solana-test-validator
     ```

3. run nest dev server

   ```command
   npm run start:dev
   ```

### Development proxy (Optional)

```command
ngrok http 3030
```

- update the `Request URL` in the **slack api**

## Environment variables

Create `.local.env` under the root (the same level of `.env`), and override the variables in the `.env`.

> Tip: If you want to use [Macos local setup](##macos-local-setup) setup, you can copy all the variables in the `.env`, and paste them in `.local.env`.

## Update the App version (Admin ONLY)

The following example shows how to create a **patch** version.

1.  update `CHANGELOG.md`

    ```command
    changelog -p
    ```

    - patch: `-p`
    - minor: `-m`
    - major: `-M`

    Then, commit the change.

2.  update `version` in `package`

    ```command
    npm version <patch|minor|major>
    ```
