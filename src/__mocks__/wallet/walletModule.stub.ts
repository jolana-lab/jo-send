export const DUMMY_WALLET = {
  username: 'test',
  publicKey: 'publicKey',
  secret: 'secret',
};

export class WalletModelStub {
  save(): any {
    return DUMMY_WALLET;
  }

  static findOne(payload: { username: string }): any {
    if (payload.username !== DUMMY_WALLET.username) {
      return;
    }
    return {
      exec: () => DUMMY_WALLET,
    };
  }
}
