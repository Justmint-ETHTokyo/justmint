import { ethers, Wallet, Contract, PopulatedTransaction } from 'ethers';
import { hexConcat, parseEther, hexValue, arrayify } from 'ethers/lib/utils';
import {
  EntryPoint,
  EntryPoint__factory,
  TokenPaymaster__factory,
  TokenPaymaster,
  SimpleAccountFactory__factory,
  SimpleAccountFactory,
  SimpleAccount__factory,
  SimpleAccount,
} from './AAtools/typechain-types';
import { UserOperation } from './AAtools/UserOperation';
import { fillAndSign, getUserOpHash, fillUserOp } from './AAtools/UserOp';
import { rethrow } from './AAtools/testutils';

export class AAUtils {
  entrypoint: EntryPoint;
  paymaster: TokenPaymaster;
  accountfactory: SimpleAccountFactory;

  constructor(
    etherSigner: Wallet,
    entrypointAddress: string,
    paymaterAddress: string,
    accountfactoryAddress: string,
  ) {
    this.entrypoint = EntryPoint__factory.connect(
      entrypointAddress,
      etherSigner,
    );
    this.paymaster = TokenPaymaster__factory.connect(
      paymaterAddress,
      etherSigner,
    );
    this.accountfactory = SimpleAccountFactory__factory.connect(
      accountfactoryAddress,
      etherSigner,
    );
  }

  async depositToPaymaster(value: string) {
    await this.entrypoint.depositTo(this.paymaster.address, {
      value: parseEther(value),
    });
  }

  async stakePaymaster() {
    await this.paymaster.addStake(1, { value: parseEther('0.001') });
  }

  async paymasterDeposit(): Promise<string> {
    const ret = await this.entrypoint.balanceOf(this.paymaster.address);

    return ret.toString();
  }

  async checkTokenDeposit(address: string): Promise<string> {
    const deposit = await this.paymaster.balanceOf(address);
    return deposit.toString();
  }

  async mintToken(address: string, amount: string) {
    await this.paymaster.mintTokens(address, parseEther(amount));
  }

  async createAccountOp(
    owner: string,
    salt: number = 0,
  ): Promise<UserOperation> {
    const createOp = await this.createOp({
      initCode: this.getAccountDeployer(owner, salt),
      verificationGasLimit: 2e6,
      paymasterAndData: this.paymaster.address,
      nonce: 0,
    });

    return createOp;
  }

  async handleOp(op: UserOperation, beneficiaryAddress: string) {
    const gasPrice = await this.entrypoint.provider.getGasPrice();
    const maxFeePerGas = gasPrice.mul(2); // 기존 가스 가격의 두 배
    const maxPriorityFeePerGas = gasPrice.mul(2); // 기존 가스 가격의 두 배
    const rcpt = await this.entrypoint
      .handleOps([op], beneficiaryAddress, {
        gasLimit: 1e7,
      })
      .catch(rethrow())
      .then(async (tx) => await tx!.wait());

    return rcpt;
  }

  // account contract execute calldata
  async generateExecutionCalldata(
    etherSigner: Wallet,
    walletAddress: string,
    contractAddress: string,
    data: string,
    value: number = 0,
  ): Promise<string> {
    let account: SimpleAccount;
    let accountExecFromEntryPoint: PopulatedTransaction;
    account = SimpleAccount__factory.connect(walletAddress, etherSigner);

    accountExecFromEntryPoint = await account.populateTransaction.execute(
      contractAddress,
      value,
      data,
    );

    return accountExecFromEntryPoint.data!;
  }

  getAccountDeployer(accountOwner: string, _salt: number = 0): string {
    return hexConcat([
      this.accountfactory.address,
      hexValue(
        this.accountfactory.interface.encodeFunctionData('createAccount', [
          accountOwner,
          _salt,
        ])!,
      ),
    ]);
  }

  async createOp(op: Partial<UserOperation>): Promise<UserOperation> {
    const op2 = await fillUserOp(op, this.entrypoint);

    return op2;
  }

  async createMessageFromOp(op: UserOperation): Promise<Uint8Array> {
    const provider = this.entrypoint.provider;

    const chainId = await provider!.getNetwork().then((net) => net.chainId);
    const message = arrayify(
      getUserOpHash(op, this.entrypoint.address, chainId),
    );

    return message;
  }

  public addSignatureToOp(op: UserOperation, signature: string): UserOperation {
    return {
      ...op,
      signature: signature,
    };
  }
}
