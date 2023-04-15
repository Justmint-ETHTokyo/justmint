import { Request, Response, NextFunction } from 'express';
import {
  exceptionMessage,
  responseMessage,
  statusCode,
} from '../modules/constants';
import jwt from '../modules/jwtHandler';
import { success, fail } from '../modules/constants/util';
import { userService } from '../services';

const getToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.headers.refreshtoken;

  //* not token
  if (!refreshToken)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));

  try {
    const refresh = jwt.verify(refreshToken as string);

    // invalid refreshToken
    if (refresh == exceptionMessage.TOKEN_INVALID) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
    }

    // expired refreshToken
    if (refresh == exceptionMessage.TOKEN_EXPIRED) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, responseMessage.EXPIRED_TOKEN));
    }

    //* find user who has valid refreshToken
    const user = await userService.findUserByRfToken(refreshToken as string);

    if (!user) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
    }

    const data = {
      accessToken: jwt.sign(user.id, user.email),
    };

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, responseMessage.CREATE_TOKEN_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

export default {
  getToken,
};
