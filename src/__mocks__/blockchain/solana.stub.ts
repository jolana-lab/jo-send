export const solanaStub = {
  Keypair: {
    generate: jest.fn(),
    fromSecretKey: jest.fn(),
  },
  LAMPORTS_PER_SOL: 1,
  SystemProgram: {
    transfer: jest.fn(),
  },
  sendAndConfirmTransaction: jest.fn(),
  Connection: jest.fn(),
  clusterApiUrl: jest.fn(),
};

export const solanaTransationStub = {
  add: jest.fn(),
};
