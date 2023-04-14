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

export default {
  getSocialUser,
  createUser,
};
