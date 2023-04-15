import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { TokenPaymaster__factory } from "../typechain/factories/contracts/samples/TokenPaymaster__factory";

const deploySimpleAccountFactory: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const provider = ethers.provider;
  const from = await provider.getSigner().getAddress();

  const entrypoint = await hre.deployments.get("EntryPoint");
  const ret = await hre.deployments.deploy("SimpleAccountFactory", {
    from,
    args: [entrypoint.address],
    gasLimit: 6e6,
    log: true,
    deterministicDeployment: true,
  });
  const paymaster = await new TokenPaymaster__factory(
    provider.getSigner()
  ).deploy(
    process.env.MUMBAI_FACTORY_ADDRESS!,
    "ttt",
    process.env.MUMBAI_ENTRY_POINT_ADDRESS!
  );
  const pmAddr = paymaster.address;
  const ownerAddr = await provider.getSigner().getAddress();
  console.log("==Paymaster addr=", pmAddr);
  console.log("==SimpleAccountFactory addr=", ret.address);
};

export default deploySimpleAccountFactory;
