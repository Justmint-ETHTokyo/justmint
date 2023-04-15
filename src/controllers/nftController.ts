import { Request, Response, NextFunction } from 'express';
import { responseMessage, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import nftService from '../services/nftService';
import { createNftDto, userInfo } from './../interfaces/user/DTO';
import { encodeByAES56 } from '../modules/crypto';
import { saveMailAuthCode } from '../modules/code';
import { sendMail } from '../modules/mail';

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
};
