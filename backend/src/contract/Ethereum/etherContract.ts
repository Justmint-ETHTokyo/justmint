import { ethers } from 'ethers';
import config from '../../config';
import deployed from './sepolia-deployed-address.json';
import factoryData from './YoursFactory.json';
import { getDeployedAddress } from '../common/commonContract';
import { AAUtils } from '../../modules/AAUtils';
import { getUserOpHash } from '../../modules/AAtools/UserOp';
import { UserOperation } from '../../modules/AAtools/UserOperation';

const factoryAddress = deployed.YoursFactory;
const etherProvider = new ethers.providers.JsonRpcProvider(config.sepoliaRPC);
const walletObj = new ethers.Wallet(config.WalletSecretKey);
const wallet = walletObj.connect(etherProvider);
const contract = new ethers.Contract(
  factoryAddress,
  factoryData.abi,
  etherProvider,
);

const ethersSigner = walletObj.connect(etherProvider);

const AA = new AAUtils(
  ethersSigner,
  config.sepoliaEntryPointAddress,
  config.sepoliaPaymasterAddress,
  config.sepoliaFactoryAddress,
);

const deployEtherNFT = async (
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

const mintEtherNFT = async (nft: ethers.Contract, address: string) => {
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

const setEtherBenefitURI = async (nft: ethers.Contract, uri: string) => {
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
    const chainId = await etherProvider!
      .getNetwork()
      .then((net) => net.chainId);
    const message = getUserOpHash(
      createOp,
      config.sepoliaEntryPointAddress,
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
      ethersSigner,
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
    const chainId = await etherProvider!
      .getNetwork()
      .then((net) => net.chainId);
    const message = getUserOpHash(
      transferOp,
      config.sepoliaEntryPointAddress,
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
  deployEtherNFT,
  mintEtherNFT,
  etherProvider,
  setEtherBenefitURI,
  createAAaccountOp,
  handleCreateWalletOp,
  createTransferOp,
  handleTransferOp,
};
