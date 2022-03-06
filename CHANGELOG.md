#### 0.0.10 (2022-03-06)

##### Continuous Integration

*  remove lint (4d1e7bff)

##### Documentation Changes

*  update developer documentation (61d5f87a)
*  add pr rules (7a2b4b67)

#### 0.0.9 (2022-03-06)

##### New Features

*  create env variables for docker compose setup (730233b7)
*  create docker compose setup (504c8618)

#### 0.0.8 (2022-03-06)

##### New Features

*  save the solana RPC URL in env variables (a8e8b1c9)
*  use solana localhost for local dev (c4f50085)

##### Bug Fixes

*  inject solana transaction instance (1143b03f)

#### 0.0.7 (2022-03-05)

##### New Features

*  inject solana and solana transaction into blockchain model (c4263c06)

##### Tests

*  complete the unit tests of solana service (3f57ef0c)

#### 0.0.6 (2022-03-05)

##### New Features

*  implement get balance in wallet service (ee6a8fb4)
*  implement check balance endpoint in slack controller (ffea2f36)

#### 0.0.5 (2022-03-05)

##### Chores

*  install throttler (9a9945c9)
*  install csurf (e7820ab4)
*  install helmet (a6ff30a4)
*  install bull (171cd87f)

##### Documentation Changes

*  create developer readme (5710c250)
*  add redis (0860d331)

##### New Features

*  set rate limit (a9a04259)
*  enable csrf protection (522b986d)
*  enable cors protection (1e4514a6)
*  use helmet (60d675d3)
*  remove slack service (d400bf89)
*  remove wallet controller (ca99ccfe)
*  put the functionality of slack service into queue (bc40ca32)
*  add redis path to env variables (ea166aa3)
*  inject BullModule (f136b83f)

##### Bug Fixes

*  provide slack processor in slack module (3178d49a)

##### Refactors

*  database to mongodb (25166aca)

##### Tests

*  mock slack queue (ee97ba7f)

#### 0.0.4 (2022-03-03)

##### Documentation Changes

*  add Commit Message Format (386f25f7)

##### New Features

*  create airdropSol in slack controller (88c27d7e)
*  implement airdropSol in slack service (67b972b7)
*  slack sendSol uses getOrCreate function of wallet (bf269dee)
*  implement get or create a wallet (5664ad5f)
*  remove wallet airdrop (5ffd0a87)
*  complete sendSol in slack service (a90984ad)
*  only collect coverage from services and controllers (b3273cef)
*  create slack response content (29daf60d)

##### Bug Fixes

*  return 200 response with error content (0a98f23e)

##### Refactors

*  sendSolDto to slackCommandDto (4676aaf1)
*  airdrop to airdropSol (e6e1cafa)

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

