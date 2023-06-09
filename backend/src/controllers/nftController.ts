import { Request, Response, NextFunction } from 'express';
import { responseMessage, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import nftService from '../services/nftService';
import { createNftDto, userInfo } from './../interfaces/user/DTO';
import { decodeByAES256, encodeByAES56 } from '../modules/crypto';
import { saveMailAuthCode, verifyCode } from '../modules/code';
import { sendMail } from '../modules/mail';
import {
  createTransferOp,
  deployEtherNFT,
  etherProvider,
  handleTransferOp,
  mintEtherNFT,
  setEtherBenefitURI,
} from '../contract/Ethereum/etherContract';
import { ethers } from 'ethers';
import etherBenefitData from '../contract/Ethereum/YoursBenefitNFT.json';
import polygonBenefitData from '../contract/Polygon/YoursBenefitNFT.json';
import lineaBenefitData from '../contract/Linea/YoursBenefitNFT.json';
import {
  uploadBenefitIpfs,
  uploadMetaIpfs,
} from '../contract/common/commonContract';
import { UserOperation } from '../modules/AAtools/UserOperation';
import {
  createTransferOp2,
  deployPolygonNFT,
  mintPolygonNFT,
  polygonProvider,
  setPolygonBenefitURI,
} from '../contract/Polygon/polygonContract';
import {
  deployLineaNFT,
  lineaProvider,
  mintLineaNFT,
  setLineaBenefitURI,
} from '../contract/Linea/lineaContract';

const getInfoByType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { type } = req.query;
  try {
    const data = await nftService.getInfoByType(+userId, type as string);
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_CATEGORY_INFO_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const getNftDetailInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { nftId } = req.params;

  try {
    const data = await nftService.getNftDetailInfo(+nftId);
    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(fail(statusCode.NOT_FOUND, responseMessage.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_NFT_DETAIL_INFO_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const getNftOwnersInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { nftId } = req.params;
  try {
    const data = await nftService.getNftOwnersInfo(+nftId);

    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_NFT_OWNERS_INFO_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const createNft = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.id;
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { location } = image;
  if (!location) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, responseMessage.NO_IMAGE));
  }

  const createNftDto: createNftDto = {
    ownerId: userId,
    nftName: req.body.nftName,
    image: location,
    description: req.body.description,
    authType: +req.body.authType,
    options: req.body.options,
    chainType: req.body.chainType,
  };

  try {
    const data = await nftService.createNft(createNftDto);

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.CREATE_NFT_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const getNftList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.id;
    const { type } = req.query;

    const data = await nftService.getNftList(userId, type as string);
    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, responseMessage.READ_NFT_ID_LIST_SUCCESS, data),
      );
  } catch (error) {
    next(error);
  }
};

const sendAuthMailForNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    const { nftId, email } = req.body;

    const userInfo: userInfo = {
      userId: userId,
      nftId: nftId,
      email: email,
    };
    const codeInfo = JSON.stringify(userInfo);

    const code = await encodeByAES56(codeInfo.toString());
    await saveMailAuthCode(email, code);
    await sendMail(code, email);
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.SEND_AUTH_MAIL_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const verifyPhotoForNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { nftId } = req.body;
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { location } = image;
  if (!location) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, responseMessage.NO_IMAGE));
  }
  try {
    const data = await nftService.verifyPhotoForNft(+userId, +nftId, location);
    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, responseMessage.SEND_AUTH_PHOTO_SUCCESS, data),
      );
  } catch (error) {
    next(error);
  }
};

const getRequestAuthPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    const { nftId } = req.params;

    const data = await nftService.getRequestAuthPhoto(+userId, +nftId);

    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_GET_REQUEST_PHOTO_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const createReward = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    const { nftId } = req.params;
    const { rewardName, description } = req.body;
    const data = await nftService.createReward(
      userId,
      +nftId,
      rewardName,
      description,
    );
    return res
      .status(statusCode.CREATED)
      .send(
        success(
          statusCode.CREATED,
          responseMessage.CREATE_NFT_REWARD_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const updateRewardInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    const { nftId } = req.params;
    const { rewardId, rewardName, description } = req.body;
    await nftService.updateRewardInfo(
      userId,
      +nftId,
      +rewardId,
      rewardName,
      description,
    );

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.UPDATE_NFT_REWARD_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const getNftRewardDetailInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rewardId } = req.params;
    const data = await nftService.getNftRewardDetailInfo(+rewardId);
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_NFT_REWARD_DETAIL_INFO_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const deleteNftReward = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    const { nftId, rewardId } = req.params;
    await nftService.deleteNftReward(userId, +nftId, +rewardId);

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.DELETE_NFT_REWARD_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const createIntegratedNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { nftIdArray, chainType } = req.body;
  try {
    const data = await nftService.createIntegratedNft(
      +userId,
      nftIdArray,
      chainType,
    );
    return res
      .status(statusCode.CREATED)
      .send(
        success(
          statusCode.CREATED,
          responseMessage.CREATE_INTEGRATED_NFT_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const getToBeIntegratedNfts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { chainType } = req.query;
  try {
    const data = await nftService.getToBeIntegratedNfts(
      +userId,
      chainType as string,
    );
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_TO_BE_INTEGRATED_NFTS_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const updateIntegratedNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { integratedNftId, nftIdArray } = req.body;
  try {
    await nftService.updateIntegratedNft(+userId, +integratedNftId, nftIdArray);
    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, responseMessage.UPDATE_INTEGRATED_NFT_SUCCESS),
      );
  } catch (error) {
    next(error);
  }
};

const deleteIntegratedNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { id } = req.query;
  try {
    const data = await nftService.deleteIntegratedNft(+userId, +(id as string));
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.DELETE_INTEGRATED_NFT_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const getIntegratedNftList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  try {
    const data = await nftService.getIntegratedNftList(+userId);
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_INTEGRATED_NFT_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const verifyMailForNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code } = req.body;

    const codeInfo = await decodeByAES256(code);
    const userInfo: userInfo = JSON.parse(codeInfo);
    const verify = await verifyCode(userInfo.email, code);
    if ((await verify) == false) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(
          fail(statusCode.BAD_REQUEST, responseMessage.VERIFY_EMAIL_AUTH_FAIL),
        );
    }

    const getNftInfo = await nftService.getNftInfo(+userInfo.nftId);

    switch (getNftInfo?.chainType) {
      case 'Ethereum': {
        const walletAddress = await nftService.getNftWalletAddress(
          +userInfo.userId,
          getNftInfo?.chainType,
        );

        const nftContract = new ethers.Contract(
          getNftInfo.nftAddress as string,
          etherBenefitData.abi,
          etherProvider,
        );

        const mintNftInfo = await mintEtherNFT(
          nftContract,
          walletAddress as string,
        );

        const verifyInfo = await nftService.verifyMailForNft(
          userInfo.userId,
          userInfo.nftId,
          mintNftInfo.mintId,
        );

        const data = {
          userId: verifyInfo.userId,
          nftId: verifyInfo.nftId,
          transactionHash: mintNftInfo.transactionHash,
          date: mintNftInfo.date,
        };
        return res
          .status(statusCode.OK)
          .send(
            success(
              statusCode.OK,
              responseMessage.VERIFY_EMAIL_AUTH_SUCCESS,
              data,
            ),
          );
      }
      case 'Polygon': {
        const walletAddress = await nftService.getNftWalletAddress(
          +userInfo.userId,
          getNftInfo?.chainType,
        );

        const nftContract = new ethers.Contract(
          getNftInfo.nftAddress as string,
          polygonBenefitData.abi,
          polygonProvider,
        );

        const mintNftInfo = await mintPolygonNFT(
          nftContract,
          walletAddress as string,
        );

        const verifyInfo = await nftService.verifyMailForNft(
          userInfo.userId,
          userInfo.nftId,
          mintNftInfo.mintId,
        );

        const data = {
          userId: verifyInfo.userId,
          nftId: verifyInfo.nftId,
          transactionHash: mintNftInfo.transactionHash,
          date: mintNftInfo.date,
        };
        return res
          .status(statusCode.OK)
          .send(
            success(
              statusCode.OK,
              responseMessage.VERIFY_EMAIL_AUTH_SUCCESS,
              data,
            ),
          );
      }
      case 'Linea': {
        const walletAddress = await nftService.getNftWalletAddress(
          +userInfo.userId,
          getNftInfo?.chainType,
        );

        const nftContract = new ethers.Contract(
          getNftInfo.nftAddress as string,
          lineaBenefitData.abi,
          polygonProvider,
        );

        const mintNftInfo = await mintLineaNFT(
          nftContract,
          walletAddress as string,
        );

        const verifyInfo = await nftService.verifyMailForNft(
          userInfo.userId,
          userInfo.nftId,
          mintNftInfo.mintId,
        );

        const data = {
          userId: verifyInfo.userId,
          nftId: verifyInfo.nftId,
          transactionHash: mintNftInfo.transactionHash,
          date: mintNftInfo.date,
        };
        return res
          .status(statusCode.OK)
          .send(
            success(
              statusCode.OK,
              responseMessage.VERIFY_EMAIL_AUTH_SUCCESS,
              data,
            ),
          );
      }
    }
  } catch (error) {
    next(error);
  }
};

const publishNFT = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.id;
  const { nftId } = req.body;
  try {
    const checkNftCreator = await nftService.checkNftCreator(+userId, +nftId);
    if (checkNftCreator) {
      const nftInfo = await nftService.getNftInfoWithReward(+nftId);
      const nftInfoIpfs = await uploadMetaIpfs(
        nftInfo.nftName,
        nftInfo.description,
        nftInfo.image,
      );

      await nftService.checkDeployedState(nftId);
      const benefitInfoIpfs = await uploadBenefitIpfs(nftInfo.benefit);

      switch (nftInfo.chainType) {
        case 'Ethereum': {
          await nftService.startLoading(+nftId);

          const data = await deployEtherNFT(
            nftInfo.nftName,
            nftInfoIpfs,
            benefitInfoIpfs,
          );

          await nftService.updateNftInfo(
            +nftId,
            data!.contractAddress,
            data!.date,
          );
          await nftService.equalReward(+nftId);
          await nftService.finishLoading(+nftId);
          return res
            .status(statusCode.OK)
            .send(
              success(statusCode.OK, responseMessage.PUBLISH_NFT_SUCCESS, data),
            );
        }
        case 'Polygon': {
          await nftService.startLoading(+nftId);

          const data = await deployPolygonNFT(
            nftInfo.nftName,
            nftInfoIpfs,
            benefitInfoIpfs,
          );

          await nftService.updateNftInfo(
            +nftId,
            data!.contractAddress,
            data!.date,
          );
          await nftService.equalReward(+nftId);
          await nftService.finishLoading(+nftId);
          return res
            .status(statusCode.OK)
            .send(
              success(statusCode.OK, responseMessage.PUBLISH_NFT_SUCCESS, data),
            );
        }
        case 'Linea': {
          await nftService.startLoading(+nftId);

          const data = await deployLineaNFT(
            nftInfo.nftName,
            nftInfoIpfs,
            benefitInfoIpfs,
          );

          await nftService.updateNftInfo(
            +nftId,
            data!.contractAddress,
            data!.date,
          );
          await nftService.equalReward(+nftId);
          await nftService.finishLoading(+nftId);
          return res
            .status(statusCode.OK)
            .send(
              success(statusCode.OK, responseMessage.PUBLISH_NFT_SUCCESS, data),
            );
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const updateNftBenefit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { nftId } = req.body;
  try {
    await nftService.checkNftCreator(+userId, +nftId);
    const nftInfo = await nftService.getNftInfoWithReward(+nftId);
    const benefitInfoIpfs = await uploadBenefitIpfs(nftInfo.benefit);
    await nftService.checkEditedState(nftId);
    switch (nftInfo.chainType) {
      case 'Ethereum': {
        await nftService.startLoading(nftId);
        const nftContract = new ethers.Contract(
          nftInfo.nftAddress as string,
          etherBenefitData.abi,
          etherProvider,
        );
        const data = await setEtherBenefitURI(nftContract, benefitInfoIpfs);

        await nftService.updateAtNft(+nftId, data.date);

        await nftService.equalRewardInfo(nftId);
        await nftService.finishLoading(nftId);
        return res
          .status(statusCode.OK)
          .send(
            success(
              statusCode.OK,
              responseMessage.UPDATE_NFT_BENEFIT_SUCCESS,
              data,
            ),
          );
      }
      case 'Polygon': {
        await nftService.startLoading(nftId);
        const nftContract = new ethers.Contract(
          nftInfo.nftAddress as string,
          etherBenefitData.abi,
          etherProvider,
        );
        const data = await setPolygonBenefitURI(nftContract, benefitInfoIpfs);

        await nftService.updateAtNft(+nftId, data.date);

        await nftService.equalRewardInfo(nftId);
        await nftService.finishLoading(nftId);
        return res
          .status(statusCode.OK)
          .send(
            success(
              statusCode.OK,
              responseMessage.UPDATE_NFT_BENEFIT_SUCCESS,
              data,
            ),
          );
      }
      case 'Linea': {
        await nftService.startLoading(nftId);
        const nftContract = new ethers.Contract(
          nftInfo.nftAddress as string,
          etherBenefitData.abi,
          etherProvider,
        );
        const data = await setLineaBenefitURI(nftContract, benefitInfoIpfs);

        await nftService.updateAtNft(+nftId, data.date);

        await nftService.equalRewardInfo(nftId);
        await nftService.finishLoading(nftId);
        return res
          .status(statusCode.OK)
          .send(
            success(
              statusCode.OK,
              responseMessage.UPDATE_NFT_BENEFIT_SUCCESS,
              data,
            ),
          );
      }
    }
  } catch (error) {
    next(error);
  }
};

const createTransferOperation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const { walletAddress } = req.query;
  const { nftId } = req.params;
  try {
    const nftInfo = await nftService.getNftInfo(+nftId);
    const mintId = await nftService.getMintId(+userId, +nftId);
    switch (nftInfo.chainType) {
      case 'Ethereum': {
        const nftContract = new ethers.Contract(
          nftInfo.nftAddress as string,
          etherBenefitData.abi,
          etherProvider,
        );
        const contractAddress = await nftService.getNftWalletAddress(
          +userId,
          nftInfo.chainType,
        );
        const data = await createTransferOp(
          nftContract,
          mintId as number,
          contractAddress as string,
          walletAddress as string,
        );
        return res
          .status(statusCode.OK)
          .send(
            success(statusCode.OK, responseMessage.UNSIGNED_OP_CREATED, data),
          );
      }
      case 'Polygon': {
        const nftContract = new ethers.Contract(
          nftInfo.nftAddress as string,
          polygonBenefitData.abi,
          polygonProvider,
        );
        const contractAddress = await nftService.getNftWalletAddress(
          +userId,
          nftInfo.chainType,
        );
        const data = await createTransferOp2(
          nftContract,
          mintId as number,
          contractAddress as string,
          walletAddress as string,
        );
        return res
          .status(statusCode.OK)
          .send(
            success(statusCode.OK, responseMessage.UNSIGNED_OP_CREATED, data),
          );
      }
      case 'Linea': {
        const nftContract = new ethers.Contract(
          nftInfo.nftAddress as string,
          lineaBenefitData.abi,
          lineaProvider,
        );
        const contractAddress = await nftService.getNftWalletAddress(
          +userId,
          nftInfo.chainType,
        );
        const data = await createTransferOp2(
          nftContract,
          mintId as number,
          contractAddress as string,
          walletAddress as string,
        );
        return res
          .status(statusCode.OK)
          .send(
            success(statusCode.OK, responseMessage.UNSIGNED_OP_CREATED, data),
          );
      }
    }
  } catch (error) {
    next(error);
  }
};

const handleTransferOperation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    const { transferOpWithSign } = req.body;
    const { nftId } = req.params;
    const strTransferOp = JSON.stringify(transferOpWithSign);
    const transferOp: UserOperation = JSON.parse(strTransferOp);
    const data = await handleTransferOp(transferOp);
    await nftService.deleteNftInMyPage(+userId, +nftId);
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.TRANSFER_NFT_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

export default {
  getInfoByType,
  getNftDetailInfo,
  getNftOwnersInfo,
  createNft,
  getNftList,
  sendAuthMailForNft,
  verifyPhotoForNft,
  getRequestAuthPhoto,
  createReward,
  updateRewardInfo,
  getNftRewardDetailInfo,
  deleteNftReward,
  createIntegratedNft,
  getToBeIntegratedNfts,
  updateIntegratedNft,
  deleteIntegratedNft,
  getIntegratedNftList,
  verifyMailForNft,
  publishNFT,
  updateNftBenefit,
  createTransferOperation,
  handleTransferOperation,
};
