import { Request, Response, NextFunction } from 'express';
import { responseMessage, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { adminService } from '../services';
import nftService from '../services/nftService';
import etherBenefitData from '../contract/Ethereum/YoursBenefitNFT.json';
import polygonBenefitData from '../contract/Polygon/YoursBenefitNFT.json';
import lineaBenefitData from '../contract/Linea/YoursBenefitNFT.json';
import {
  etherProvider,
  mintEtherNFT,
} from '../contract/Ethereum/etherContract';
import { ethers } from 'ethers';
import {
  mintPolygonNFT,
  polygonProvider,
} from '../contract/Polygon/polygonContract';
import { lineaProvider, mintLineaNFT } from '../contract/Linea/lineaContract';

const getRequestUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    const { nftId } = req.params;

    const data = await adminService.getRequestUser(userId, +nftId);

    return res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, responseMessage.READ_AUTH_PEOPLE_SUCCESS, data),
      );
  } catch (error) {
    next(error);
  }
};

const getAdminNftRewardList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { nftId } = req.params;
  try {
    const data = await adminService.getAdminNftRewardList(+nftId);
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_NFT_ADMIN_REWARD_INFO_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const getAdminNftRewardDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { rewardId } = req.params;
  try {
    const data = await adminService.getAdminNftRewardDetail(+rewardId);
    return res
      .status(statusCode.OK)
      .send(
        success(
          statusCode.OK,
          responseMessage.READ_NFT_ADMIN_REWARD_DETAIL_INFO_SUCCESS,
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

const approveOrRejectNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { tableId, type, reason } = req.body;
  const userId = req.body.id;
  try {
    if (type) {
      const approveInfo = await adminService.approveNft(+tableId);
      const getNftInfo = await nftService.getNftInfo(+approveInfo.nftId);
      switch (getNftInfo?.chainType) {
        case 'Ethereum': {
          const walletAddress = await nftService.getNftWalletAddress(
            +approveInfo.userId,
            getNftInfo?.chainType,
          );
          const nftContract = new ethers.Contract(
            getNftInfo.nftAddress as string,
            etherBenefitData.abi,
            etherProvider,
          );
          const mint = await mintEtherNFT(nftContract, walletAddress as string);
          await nftService.saveMintId(
            +approveInfo.userId,
            +approveInfo.nftId,
            mint.mintId,
          );
          return res
            .status(statusCode.OK)
            .send(
              success(
                statusCode.OK,
                responseMessage.APPROVE_NFT_SUCCESS,
                approveInfo,
              ),
            );
        }
        case 'Polygon': {
          const walletAddress = await nftService.getNftWalletAddress(
            +approveInfo.userId,
            getNftInfo?.chainType,
          );
          const nftContract = new ethers.Contract(
            getNftInfo.nftAddress as string,
            polygonBenefitData.abi,
            polygonProvider,
          );
          const mint = await mintPolygonNFT(
            nftContract,
            walletAddress as string,
          );
          await nftService.saveMintId(
            +approveInfo.userId,
            +approveInfo.nftId,
            mint.mintId,
          );
          return res
            .status(statusCode.OK)
            .send(
              success(
                statusCode.OK,
                responseMessage.APPROVE_NFT_SUCCESS,
                approveInfo,
              ),
            );
        }
        case 'Linea': {
          const walletAddress = await nftService.getNftWalletAddress(
            +approveInfo.userId,
            getNftInfo?.chainType,
          );
          const nftContract = new ethers.Contract(
            getNftInfo.nftAddress as string,
            lineaBenefitData.abi,
            lineaProvider,
          );
          const mint = await mintLineaNFT(nftContract, walletAddress as string);
          await nftService.saveMintId(
            +approveInfo.userId,
            +approveInfo.nftId,
            mint.mintId,
          );
          return res
            .status(statusCode.OK)
            .send(
              success(
                statusCode.OK,
                responseMessage.APPROVE_NFT_SUCCESS,
                approveInfo,
              ),
            );
        }
      }
    }
    if (!type) {
      await adminService.rejectNft(+tableId, reason);
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, responseMessage.APPROVE_NFT_FAIL));
    }
    return res
      .status(statusCode.NOT_FOUND)
      .send(fail(statusCode.NOT_FOUND, responseMessage.NOT_FOUND));
  } catch (error) {
    next(error);
  }
};

export default {
  getRequestUser,
  getAdminNftRewardList,
  getAdminNftRewardDetail,
  approveOrRejectNft,
};
