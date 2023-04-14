import auth from '../config/auth';
import { PrismaClient } from '@prisma/client';
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

export default {
  getSocialUser,
  findUserById,
  updateRefreshToken,
};
