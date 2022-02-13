# Jo Send

It's an Application that allows users **send cryto coins/token to friends on chat applications**.

## Supported cryto coins/token

- [x] SOL

## Supported chat applications

- [x] Slack
- [ ] Discord

## Development

1. open development proxy (Optional)

   ```command
   ngrok http 3030
   ```

   update the `Request URL` in the **[slack api](https://api.slack.com/apps/A032XLWRP3N/general)**

2. start the local database

   ```command
   brew services start mongodb-community@5.0
   ```

3. run nest dev server

   ```command
   npm run start:dev
   ```
