declare module "NftType" {
    export interface NftInfo {
        id: number;
        nftName: string;
        image: string;
        numberOfOwners: number;
        description: string;
        numberOfRewards: number;
        rewards: rewardType[];
        authType?: 1|2;
        chainType?: 'Ethereum' | 'Polygon' | 'Klaytn' | 'Solana' | 'Aptos';
        options?: string;
        isDeployed?: boolean;
        isEdited?: boolean;
        nftAddress?: string;
        createdAt?: string;
        updatedAt?: string;
    }
    export interface NftReward {
        id: number;
        rewardName: string;
    }
}