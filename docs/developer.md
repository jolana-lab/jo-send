# Developer

This document is for the developers.

## Development

### Installation

```command
git clone https://github.com/jolana-lab/jo-send.git
cd jo-send
npm ci
```

### Setup

We provide two development setups:

- [Local (macos)](###Local)
- Docker

Besides, the developers need to write **unit tests** themselves.

- During coding:

  Watching if the implemented codes pass the tests, and writing new tests.

  ```command
  npm run test:watch
  ```

- After coding:

  Checking the test coverage (Only the tests of **controllers and services** are collected).

  ```command
  npm run test:cov
  ```

### Local (macos)

This setup requires the developers to install the infrastructures on their machine, and start a **local solana blockchain**.

First, install the infrastructures:

- [MongoDB Community Edition on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-on-macos)

- [Redis](https://redis.io/topics/quickstart)

- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools#macos--linux)

Then, follow the steps:

1.  start the infrastructures

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

2.  run nest dev server

    ```command
    npm run start:dev
    ```

3.  open development proxy (Optional)

    ```command
    ngrok http 3030
    ```

    - update the `Request URL` in the **slack api**

## Environment variables

Create `.local.env` under the root (the same level of `.env`), and override the variables in the `.env`.

## Deployment (Admin ONLY)

1. Update the App version

   The following example shows how to create a **patch** version.

   1. update `CHANGELOG.md`

      ```command
      changelog -p
      ```

      - patch: `-p`
      - minor: `-m`
      - major: `-M`

      Then, commit the change.

   2. update `version` in `package`

      ```command
      npm version <patch|minor|major>
      ```
