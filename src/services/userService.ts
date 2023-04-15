import auth from '../config/auth';
import { PrismaClient } from '@prisma/client';
import { userCreateDto } from '../interfaces/user/DTO';
import errorGenerator from '../middlewares/error/errorGenerator';
import { responseMessage, statusCode } from '../modules/constants';
const prisma = new PrismaClient();

export type SocialPlatform = 'kakao';

//* get social user info
const getSocialUser = async (accesstoken: string) => {
  try {
    const user = await auth.kakaoAuth(accesstoken);
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        snsId: userId,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const updateRefreshToken = async (id: number, refreshToken: string) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  } catch (error) {
    throw error;
  }
};

const signUpUser = async (
  userCreateDto: userCreateDto,
  refreshToken: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        snsId: userCreateDto.snsId,
        name: userCreateDto.nickname,
        profileImage: userCreateDto.profileImage,
        email: userCreateDto.email,
        phone: userCreateDto.phone,
        social: userCreateDto.social,
        refreshToken: refreshToken,
        isMarketing: userCreateDto.isMarketing,
        secret: userCreateDto.secret,
      },
    });

    for (let i = 0; i < userCreateDto.walletAddress.length; i++) {
      await prisma.user_wallet.create({
        data: {
          userId: user.id,
          chainType: userCreateDto.walletAddress[i].chainType,
          walletAddress: userCreateDto.walletAddress[i].address,
        },
      });
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByRfToken = async (refreshToken: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserInfo = async (userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw errorGenerator({
        msg: responseMessage.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }
    const data = {
      name: user.name,
      email: user.email,
      image: user.profileImage,
      phoneNumber: user.phone,
      secret: user.secret,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

const getQuestInfo = async (userId: number) => {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        isQuest: true,
      },
    });
    if (!data) {
      throw errorGenerator({
        msg: responseMessage.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      });
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  getSocialUser,
  findUserById,
  updateRefreshToken,
  signUpUser,
  findUserByRfToken,
  getUserInfo,
  getQuestInfo,
};
