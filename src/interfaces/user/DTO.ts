export interface userCreateDto {
  nickname: string;
  snsId: string;
  profileImage: string;
  email: string;
  phone: string;
  social: string;
  isMarketing: boolean;
  secret: string;
  walletAddress: [
    {
      chainType: string;
      address: string;
    },
  ];
}

export interface createNftDto {
  ownerId: number;
  nftName: string;
  image: string;
  description: string;
  authType: number;
  options: string;
  chainType: string;
}

export interface userInfo {
  userId: number;
  nftId: number;
  email: string;
}
