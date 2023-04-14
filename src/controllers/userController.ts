import { Request, Response, NextFunction } from 'express';
import {
  exceptionMessage,
  responseMessage,
  statusCode,
} from '../modules/constants';
import { success, fail } from '../modules/constants/util';
import userService from '../services/userService';
import jwt from '../modules/jwtHandler';
import { SocialUser } from '../interfaces/user/SocialUser';
import { userCreateDto } from '../interfaces/user/DTO';
import { createAuthCode, saveAuthCode } from '../modules/code';
import makeSignature from '../modules/getSignature';
import config from '../config';
import axios from 'axios';

const getSocialUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.body;

  //* not token
  if (!token) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));
  }

  try {
    const user = await userService.getSocialUser(token);

    //* not user
    if (!user) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
    }
    if (user == exceptionMessage.INVALID_USER) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));
    }
    //* check signup user
    const existUser = await userService.findUserById(
      (user as SocialUser).userId,
    );
    if (!existUser) {
      //* no signup user
      const data = {
        signUp: false,
      };
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, responseMessage.SIGNIN_FAIL, data));
    }

    //* if signup user, login
    const refreshToken = jwt.createRefresh();
    const accessToken = jwt.sign(existUser.id, existUser.email);

    await userService.updateRefreshToken(existUser.id, refreshToken);

    const data = {
      signUp: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.SIGNIN_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const userCreateDto: userCreateDto = req.body;
  try {
    const refreshToken = jwt.createRefresh();
    const newUser = await userService.signUpUser(userCreateDto, refreshToken);
    const accessToken = jwt.sign(newUser.id, newUser.email);

    const data = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.SIGNUP_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const sendAuthMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { phoneNumber } = req.body;
  const authCode = createAuthCode();

  try {
    await saveAuthCode(phoneNumber, authCode);
    await sendMessage(phoneNumber, authCode);

    const data = {
      verifyCode: authCode,
    };

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.SEND_MESSAGE_SUCCESS, data));
  } catch (error) {
    next(error);
  }

  async function sendMessage(phoneNumber: any, authCode: number) {
    const time = Date.now().toString();
    const signature = makeSignature(time);

    const messages =
      phoneNumber instanceof Array
        ? phoneNumber.map(
            (number) =>
              new Object({
                to: number,
              }),
          )
        : [{ to: phoneNumber }];

    const body = JSON.stringify({
      type: 'SMS',
      countryCode: '82',
      from: config.callNumber,
      content: `[yours] 인증번호 [${authCode}]를 입력해주세요`,
      messages: messages,
    });

    const response = await axios({
      method: 'POST',
      url: `https://sens.apigw.ntruss.com/sms/v2/services/${config.naverCloudServiceId}/messages`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': time,
        'x-ncp-iam-access-key': `${config.naverCloudSmsAccessKey}`,
        'x-ncp-apigw-signature-v2': signature,
      },
      data: body,
    });

    return response;
  }
};

export default {
  getSocialUser,
  createUser,
  sendAuthMessage,
};
