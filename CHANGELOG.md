#### 0.0.3 (2022-02-27)

##### Documentation Changes

*  show the steps to update app version (533a8cb4)

#### 0.0.2 (2022-02-27)

##### Chores

*  install changelog (b2c9ff31)
*  remove bcrypt and install cryto-js (234e158c)
*  install bcrypt (0059bfe0)
*  install @nestjs/config (fe2a5f4c)
*  install mongoose (f6e74b55)
*  install @solana/web3.js (c7ef7702)

##### New Features

*  complete send SOL in slack service (b2333a4c)
*  pass username through the URL to create wallet (1971fc90)
*  send SOLs (1dd5b773)
*  import wallet service in slack service (02d3c29e)
*  create a function to get a wallet (bc80aac0)
*  init slack service and send sol function (e979d7dc)
*  complete send-sol endpoint (95e21b3e)
*  init slack controller and send-sol endpoint (5a15a56c)
*  init slack module (b77aaad0)
*  encrypt the secret key with username, createAt and env nonce (78afba8b)
*  add createAt to wallet schema (14a2af16)
*  provide default env variable (a320075f)
*  make wallet controller 100% test covered (4495103a)
*  validate sol number (50bac50a)
*  get solana network from env variable (c9040423)
*  make walletService 100% test cover (df4ab46f)
*  remove web3 functions from walletService to solanaService (ae8f95a1)
*  import solana module (a662d895)
*  create solana service (b4026efb)
*  vscode config importModuleSpecifier to relative (dce9539a)
*  airdrop a SOL on devnet (6fc78ce5)
*  add public to wallet schema (7fde7f4e)
*  create an endpoint for airdropping (87ca67b1)
*  encrypt and decrypt using AES (5df38a12)
*  save a test wallet to local db (50d846f0)
*  create wallet schema (0a3102de)
*  connect to database (7bfc25a7)
*  configure env variables (a926e616)
*  create a wallet (03d8ccf8)
*  expose the port 3030 (bc29f5a7)
*  init wallet (ef36f397)
*  remove app controller and service (a4e6ae98)

##### Refactors

*  rename SolanaModule to BlockchainModule (b6c3ae5a)
*  walletModule to wallet.module (55272b52)

