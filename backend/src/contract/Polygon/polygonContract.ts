import { ethers } from 'ethers';
import config from '../../config';
import deployed from './polygon-deployed-address.json';
import factoryData from './YoursFactory.json';
import benefitData from './YoursBenefitNFT.json';
import { getDeployedAddress } from '../common/commonContract';
import { AAUtils } from '../../modules/AAUtils';
import { UserOperation } from '../../modules/AAtools/UserOperation';
import { getUserOpHash } from '../../modules/AAtools/UserOp';

const factoryAddress = deployed.YoursFactory;
const polygonProvider: ethers.providers.Provider =
  ethers.providers.getDefaultProvider(config.polygonRPC);
const walletObj = new ethers.Wallet(config.WalletSecretKey);
const wallet = walletObj.connect(polygonProvider);
const contract = new ethers.Contract(
  factoryAddress,
  factoryData.abi,
  polygonProvider,
);
const polygonSigner = walletObj.connect(polygonProvider);

const AA = new AAUtils(
  polygonSigner,
  config.polygonEntryPointAddress,
  config.polygonPaymasterAddress,
  config.polygonFactoryAddress,
);

const deployPolygonNFT = async (
  name: string | null,
  uri: string | null,
  benefitUri: string | null,
) => {
  let transaction;
  const gasFeeData = await polygonProvider.getFeeData();
  transaction = await contract
    .connect(wallet)
    .deployNFT(name, '', uri, benefitUri, [], {
      gasPrice: gasFeeData.gasPrice,
    });
  const deployedInfo = await getDeployedAddress(transaction);
  while (typeof deployedInfo == 'string') {
    const deployedInfo = await getDeployedAddress(transaction);
    return deployedInfo;
  }

  const data = {
    contractAddress: deployedInfo.contractAddress,
    transactionHash: deployedInfo.transactionHash,
    date: deployedInfo.date,
  };
  return data;
};

const mintPolygonNFT = async (nft: any, address: string) => {
  const gasFeeData = await polygonProvider.getFeeData();
  const transaction = await nft
    .connect(wallet)
    .mint(address, { gasPrice: gasFeeData.gasPrice });
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

const setPolygonBenefitURI = async (nft: ethers.Contract, uri: string) => {
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
    const chainId = await polygonProvider!
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

const createTransferOp2 = async (
  nft: ethers.Contract,
  id: number,
  from: string,
  to: string,
) => {
  try {
    const transfer = await nft.populateTransaction.transferFrom(from, to, id);
    const calldata = await AA.generateExecutionCalldata(
      polygonSigner,
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
    const chainId = await polygonProvider!
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

export {
  deployPolygonNFT,
  mintPolygonNFT,
  polygonProvider,
  setPolygonBenefitURI,
  createAAaccountOp,
  handleCreateWalletOp,
  createTransferOp2,
};
