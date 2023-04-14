import auth from '../config/auth';
import { PrismaClient } from '@prisma/client';
import { userCreateDto } from '../interfaces/user/DTO';
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
export default {
  getSocialUser,
  findUserById,
  updateRefreshToken,
  signUpUser,
};