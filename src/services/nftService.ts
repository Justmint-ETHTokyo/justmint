import { PrismaClient } from '@prisma/client';
import errorGenerator from '../middlewares/error/errorGenerator';
import { statusCode, responseMessage } from '../modules/constants';
const prisma = new PrismaClient();

const getInfoByType = async (userId: number, type: string) => {
  try {
    switch (type) {
      case 'own': {
        const nftsInfo = await prisma.user_has_nfts.findMany({
          where: {
            userId: userId,
          },
          select: {
            nftId: true,
            nfts: {
              select: {
                id: true,
                nftName: true,
                image: true,
                reward: true,
              },
            },
          },
        });

        const data = await Promise.all(
          nftsInfo.map((nftInfo: any) => {
            const result = {
              id: nftInfo.nftId,
              nftName: nftInfo.nfts.nftName,
              image: nftInfo.nfts.image,
              rewards: nftInfo.nfts.reward.length,
            };
            return result;
          }),
        );
        return data;
      }
      case 'reward': {
        const nftsRewardInfo = await prisma.user_has_nfts.findMany({
          where: {
            userId: userId,
          },
          select: {
            nftId: true,
            nfts: {
              select: {
                id: true,
                nftName: true,
                reward: {
                  select: {
                    id: true,
                    rewardName: true,
                  },
                },
              },
            },
          },
        });

        let rewardArray = [];
        for (let i = 0; i < nftsRewardInfo.length; i++) {
          for (let j = 0; j < nftsRewardInfo[i].nfts!.reward.length; j++) {
            const result = {
              nftId: nftsRewardInfo[i].nftId,
              rewardId: nftsRewardInfo[i].nfts.reward[j].id,
              nftName: nftsRewardInfo[i].nfts?.nftName,
              rewardName: nftsRewardInfo[i].nfts?.reward[j].rewardName,
            };
            rewardArray.push(result);
          }
        }
        return rewardArray;
      }
      case 'create': {
        const ownNftsInfo = await prisma.nfts.findMany({
          where: {
            ownerId: userId,
          },
          select: {
            id: true,
            nftName: true,
            image: true,
            reward: true,
          },
        });
        const data = await Promise.all(
          ownNftsInfo.map((ownNftInfo: any) => {
            const result = {
              id: ownNftInfo.id,
              nftName: ownNftInfo.nftName,
              image: ownNftInfo.image,
              rewards: ownNftInfo.reward.length,
            };
            return result;
          }),
        );
        return data;
      }
      default:
        throw errorGenerator({
          msg: responseMessage.NOT_FOUND,
          statusCode: statusCode.NOT_FOUND,
        });
    }
  } catch (error) {
    throw error;
  }
};

const getNftDetailInfo = async (nftId: number) => {
  try {
    const getNftOwners = await prisma.user_has_nfts.findMany({
      where: {
        nftId,
      },
    });
    const getDetailData = await prisma.nfts.findFirst({
      where: {
        id: nftId,
      },
      include: {
        reward: {
          select: {
            id: true,
            rewardName: true,
          },
        },
      },
    });

    const data = {
      id: getDetailData?.id,
      nftName: getDetailData?.nftName,
      image: getDetailData?.image,
      numberOfOwners: getNftOwners.length,
      description: getDetailData?.description,
      chainType: getDetailData?.chainType,
      isDeployed: getDetailData?.isDeployed,
      numberOfRewards: getDetailData?.reward.length,
      rewards: getDetailData?.reward,
      authType: getDetailData?.authType,
      options: getDetailData?.options,
      nftAddress: getDetailData?.nftAddress,
      isEdited: getDetailData?.isEdited,
      isLoading: getDetailData?.isLoading,
      createdAt: getDetailData?.createdAt,
      updatedAt: getDetailData?.updatedAt,
    };

    if (!data.id) {
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
  getInfoByType,
  getNftDetailInfo,
};
