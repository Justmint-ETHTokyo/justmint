import { ethers } from 'ethers';
import config from '../../config';
import deployed from './linea-deployed-address.json';
import factoryData from './YoursFactory.json';
import { getDeployedAddress } from '../common/commonContract';
import { AAUtils } from '../../modules/AAUtils';
import { getUserOpHash } from '../../modules/AAtools/UserOp';
import { UserOperation } from '../../modules/AAtools/UserOperation';

const factoryAddress = deployed.YoursFactory;
const lineaProvider = new ethers.providers.JsonRpcProvider(config.lineaRPC);
const walletObj = new ethers.Wallet(config.WalletSecretKey);
const wallet = walletObj.connect(lineaProvider);
const contract = new ethers.Contract(
  factoryAddress,
  factoryData.abi,
  lineaProvider,
);

const lineaSigner = walletObj.connect(lineaProvider);

const AA = new AAUtils(
  lineaSigner,
  config.lineaEntryPointAddress,
  config.lineaPaymasterAddress,
  config.lineaFactoryAddress,
);

const deployLineaNFT = async (
  name: string | null,
  uri: string | null,
  benefitUri: string | null,
) => {
  try {
    let transaction;
    const gas = await contract
      .connect(wallet)
      .estimateGas.deployNFT(name, '', uri, benefitUri, []);
    transaction = await contract
      .connect(wallet)
      .deployNFT(name, '', uri, benefitUri, [], {
        gasLimit: gas,
      });
    const deployedInfo = await getDeployedAddress(transaction);
    while (typeof deployedInfo.contractAddress == 'string') {
      const deployedInfo = await getDeployedAddress(transaction);
      return deployedInfo;
    }

    const data = {
      contractAddress: deployedInfo.contractAddress,
      transactionHash: deployedInfo.transactionHash,
      date: deployedInfo.date,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

const mintLineaNFT = async (nft: ethers.Contract, address: string) => {
  const transaction = await nft.connect(wallet).mint(address);
  const rc = await transaction.wait();
  const event = rc.events.find((event: any) => event.event === 'Mint');
  const mintId = event.args[0].toNumber();
  const transactionHash = event.transactionHash;
  const block = await event.getBlock(); // check minting block timestamp
  const date = new Date(block.timestamp * 1000);

  const data = {
    mintId: mintId,
    transactionHash: transactionHash,
    date: date,
  };

  return data;
};

const setLineaBenefitURI = async (nft: ethers.Contract, uri: string) => {
  const transaction = await nft.connect(wallet).setBenefitsURI(uri);
  const rc = await transaction.wait();
  const event = rc.events.find(
    (event: any) => event.event === 'ChangeBenefitsURI',
  );
  const transactionHash = event.transactionHash;
  const block = await event.getBlock(); // check minting block timestamp
  const date = new Date(block.timestamp * 1000);

  const data = {
    transactionHash: transactionHash,
    date: date,
  };

  return data;
};

const createAAaccountOp = async (ownerAddress: string) => {
  try {
    if ((await AA.paymasterDeposit()) == '0') {
      await AA.depositToPaymaster('0.01');
    }

    const createOp = await AA.createAccountOp(ownerAddress, 10);
    const chainId = await lineaProvider!
      .getNetwork()
      .then((net) => net.chainId);
    const message = getUserOpHash(
      createOp,
      config.lineaEntryPointAddress,
      chainId,
    );
    const data = {
      createOp: createOp,
      message: message,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

const handleCreateWalletOp = async (createOpWithSign: UserOperation) => {
  try {
    await AA.mintToken(createOpWithSign.sender, '1000');
    const beneficiaryAddress = config.walletAddress;
    const rcpt = await AA.handleOp(createOpWithSign, beneficiaryAddress);
    const data = {
      rcpt: rcpt,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

const createTransferOp = async (
  nft: ethers.Contract,
  id: number,
  from: string,
  to: string,
) => {
  try {
    const transfer = await nft.populateTransaction.transferFrom(from, to, id);
    const calldata = await AA.generateExecutionCalldata(
      lineaSigner,
      from,
      nft.address,
      transfer.data!,
    );
    const transferOp: UserOperation = await AA.createOp({
      sender: from,
      callData: calldata,
      paymasterAndData: AA.paymaster.address,
      verificationGasLimit: 1e6,
      callGasLimit: 1e6,
    });
    const chainId = await lineaProvider!
      .getNetwork()
      .then((net) => net.chainId);
    const message = getUserOpHash(
      transferOp,
      config.lineaEntryPointAddress,
      chainId,
    );
    const data = {
      transferOp: transferOp,
      message: message,
    };
    return data;
  } catch (error) {
    throw error;
  }
};
const handleTransferOp = async (createOpWithSign: UserOperation) => {
  try {
    const beneficiaryAddress = config.walletAddress;
    const rcpt = await AA.handleOp(createOpWithSign, beneficiaryAddress);
    const data = {
      transactionHash: rcpt.transactionHash,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  deployLineaNFT,
  mintLineaNFT,
  lineaProvider,
  setLineaBenefitURI,
  createAAaccountOp,
  handleCreateWalletOp,
  createTransferOp,
  handleTransferOp,
};
