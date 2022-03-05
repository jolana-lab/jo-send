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

- [local](###Local)
- docker

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

### Local

1.  start the local databases

    - **mongodb**

      ```command
      brew services start mongodb-community@5.0
      ```

    - **redis**

      ```command
      redis-server
      ```

2.  run nest dev server

    ```command
    npm run start:dev
    ```

3.  open development proxy (Optional)

    ```command
    ngrok http 3030
    ```

    update the `Request URL` in the **slack api**

## Deployment

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
