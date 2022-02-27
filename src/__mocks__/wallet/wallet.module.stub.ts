export const DUMMY_WALLET = {
  username: 'test',
  publicKey: 'publicKey',
  secret: 'secret',
  createdAt: new Date('2022-02-14T21:52:19.872+00:00'),
};

export class WalletModelStub {
  save(): any {
    return DUMMY_WALLET;
  }

  static findOne(payload: { username: string }): any {
    if (payload.username !== DUMMY_WALLET.username) {
      return;
    }
    return DUMMY_WALLET;
  }
}
