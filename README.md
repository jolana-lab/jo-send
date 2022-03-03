# Jo Send

It's an Application that allows users **send cryto coins/token to friends on chat applications**.

## Supported cryto coins/token

- [x] SOL

## Supported chat applications

- [x] Slack
- [ ] Discord

## Development

1.  start the local databases

    - mongodb

      ```command
      brew services start mongodb-community@5.0
      ```

    - redis

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
