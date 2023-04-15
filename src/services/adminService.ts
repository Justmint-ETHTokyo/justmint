import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getRequestUser = async (userId: number, nftId: number) => {
  const users = await prisma.admin.findMany({
    where: {
      nfts: {
        ownerId: userId,
      },
      nftId: nftId,
      deletedAt: null,
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
      image: true,
    },
  });
  const data = await Promise.all(
    users.map((user: any) => {
      const result = {
        id: user.id,
        userId: user.user.id,
        name: user.user.name,
        profileImage: user.user.profileImage,
        image: user.image,
      };

      return result;
    }),
  );
  return data;
};

export default {
  getRequestUser,
};
