import { ethers, BigNumber } from "hardhat";
import dotenv from "dotenv";

import { CommunityHub, CommunityHub__factory, ICommunityHub } from "../typechain";

dotenv.config();

let currentCommunityHub: CommunityHub;
let newCommunityHub: CommunityHub;

let communityHubAddress = process.env.CURRENT_COMMUNITY_HUB_CONTRACT_ADDRESS || "";
let newCommunityHubAddress = process.env.NEW_COMMUNITY_HUB_CONTRACT_ADDRESS || "";

let signerPrivateKey = process.env.PRIVATE_KEY || "";

let communityProcessIds = [
    {
        communityId: 0,
        processIds: [
            "0x0",
            "0x1",
        ]
    },
    {
        communityId: 1,
        processIds: [
            "0x0",
            "0x1",
        ]
    },
]

async function main() {
    const signer = new ethers.Wallet(signerPrivateKey);
    const signerAddress = await signer.getAddress();
    console.log("Using signer with address:", signerAddress);

    currentCommunityHub = CommunityHub__factory.connect(communityHubAddress, signer);
    newCommunityHub = CommunityHub__factory.connect(newCommunityHubAddress, signer);

    await migrateCommunities();

    // for each communityProcessIds migrate results
    for (let {communityId, processIds} of communityProcessIds) {
        await migrateResultsForCommunity(communityId, processIds);
    }
}

async function migrateCommunities() {
    let communities: Map<number, ICommunityHub.CommunityStructOutput> = new Map();
    // Get current communities
    const communityCount = await currentCommunityHub.getNextCommunityId();
    for (let i = 0; i < communityCount; i++) {
        let community = await currentCommunityHub.getCommunity(i);
        communities.set(i, community);
    }
    // Add communities to new CommunityHub
    for (let i = 0; i < communityCount; i++) {
        let community = communities.get(i);

        let metadata: ICommunityHub.CommunityMetadataStruct = {
            name: community?.[0]?.[0] ?? '',
            imageURI: community?.[0]?.[1] ?? '',
            groupChatURL: community?.[0]?.[2] ?? '',
            channels: community?.[0]?.[3] ?? [],
            notifications: community?.[0]?.[4] ?? false,
        }
        let census: ICommunityHub.CensusStruct = {
            censusType: community?.[1]?.[0] ?? 0,
            tokens: community?.[1]?.[1] ?? [],
            channel: community?.[1]?.[2] ?? '',
        }
        let guardians: Array<BigNumber> = community?.[2] ?? [];
        let createElectionPermission: BigNumber = community?.[3] ?? 0; 

        await newCommunityHub.createCommunity(
            metadata,
            census,
            guardians,
            createElectionPermission            
        )

        // check if community was created
        let newCommunity = await newCommunityHub.getCommunity(i);
        if (newCommunity[0][0] !== metadata.name) {
            console.error(`Failed to create community ${metadata.name}`);
        }
    }
}

async function migrateResultsForCommunity(communityId: number, processIds: Array<string>) {
    for (let processId of processIds) {
        let result = await currentCommunityHub.getResult(communityId, processId);
        await newCommunityHub.setResult(communityId, processId, result);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});