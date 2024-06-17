import { ethers, BigNumber } from "hardhat";
import dotenv from "dotenv";

import { CommunityHub, CommunityHub__factory, ICommunityHub, IElectionResults } from "../typechain";

dotenv.config();

let currentCommunityHub: CommunityHub;
let newCommunityHub: CommunityHub;

let communityHubAddress = process.env.CURRENT_COMMUNITY_HUB_CONTRACT_ADDRESS || "";
let newCommunityHubAddress = process.env.NEW_COMMUNITY_HUB_CONTRACT_ADDRESS || "";
let degenRPC = process.env.DEGEN_RPC_URL || "";

let baseSepoliaRPC = process.env.BASE_SEPOLIA_RPC_URL || "";

let signerPrivateKey = process.env.PRIVATE_KEY || "";

let farcaster_vote_backend = process.env.VOTE_FRAME_BACKEND_URL || "";
let farcaster_vote_polls_by_community_endpoint = farcaster_vote_backend + "/rankings/pollsByCommunity/";

async function main() {
    const providerDegen = new ethers.JsonRpcProvider(degenRPC);
    const signerDegen = new ethers.Wallet(signerPrivateKey, providerDegen);
    const signerAddressDegen = await signerDegen.getAddress();
    console.log("Using signer with address for Degen Chain:", signerAddressDegen);

    const providerBaseSepolia = new ethers.JsonRpcProvider(baseSepoliaRPC);
    const signerBaseSepolia = new ethers.Wallet(signerPrivateKey, providerBaseSepolia);
    const signerAddressBaseSepolia = await signerBaseSepolia.getAddress();
    console.log("Using signer with address for Base Sepolia:", signerAddressBaseSepolia);
    console.log();

    currentCommunityHub = CommunityHub__factory.connect(communityHubAddress, signerDegen);
    newCommunityHub = CommunityHub__factory.connect(newCommunityHubAddress, signerBaseSepolia);

    // await listCommunities();
    
    // await migrateCommunities(signerAddressBaseSepolia);

    await migrateResults(signerAddressBaseSepolia);
}

async function listCommunities() {
    let communities: Map<number, ICommunityHub.CommunityStructOutput> = new Map();
    const communityCount = await currentCommunityHub.getNextCommunityId();
    // community 0 reserved
    for (let i = 1; i < communityCount; i++) {
        let community = await currentCommunityHub.getCommunity(i);
        communities.set(i, community);
    }
    for (let i = 1; i < communityCount; i++) {
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

        console.log(`Community ${i}:`);
        console.log(`Metadata: `, metadata);
        console.log(`Census: `, census);
        console.log(`Guardians: `, guardians.map(guardian => guardian.toString()));
        console.log(`Create Election Permission: `, createElectionPermission.toString());
        console.log(`Disabled: `, community?.disabled ?? false);
        console.log(`Funds: `, community?.funds ?? ethers.toBigInt(0));
    }
}

async function migrateCommunities(signerAddress: string) {
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

        let channelsArray = community?.metadata.channels ? Array.from(community.metadata.channels) : [];
        let metadata: ICommunityHub.CommunityMetadataStruct = {
            name: community?.metadata.name ?? '',
            imageURI: community?.metadata.imageURI ?? '',
            groupChatURL: community?.metadata.groupChatURL ?? '',
            channels: channelsArray,
            notifications: community?.metadata.notifications ?? false,
        }

        
        let tokensArray: ICommunityHub.TokenStruct[] = [];
        // for each token in coomunity.census.tokens add it to tokensArray
        for (let token of community?.census.tokens ?? []) {
            let tokenStruct: ICommunityHub.TokenStruct = {
                blockchain: token.blockchain,
                contractAddress: token.contractAddress,
            }
            tokensArray.push(tokenStruct);
        }
        let census: ICommunityHub.CensusStruct = {
            censusType: community?.census.censusType ?? 0,
            tokens: tokensArray,
            channel: community?.census.channel ?? '',
        }

        let guardiansArray = community?.guardians ? Array.from(community.guardians) : [];
        let createElectionPermission = community?.createElectionPermission ? community.createElectionPermission : ethers.toBigInt(0);

        console.log(`Migrating community ${i}:`);
        console.log(`########################################`);

        console.log(`Metadata: `, metadata);
        console.log(`Census: `, census);
        console.log(`Guardians: `, guardiansArray.map(guardian => guardian.toString()));
        console.log(`Create Election Permission: `, createElectionPermission.toString());
        console.log(`Disabled: `, community?.disabled ?? false);
        console.log(`Funds: `, community?.funds ?? ethers.toBigInt(0));

        console.log();

        let nonce = await ethers.provider.getTransactionCount(signerAddress);
        
        await newCommunityHub.createCommunity(
            metadata,
            census,
            guardiansArray,
            createElectionPermission,
            {nonce: nonce}
        )

        await new Promise(resolve => setTimeout(resolve, 30000));

        nonce = await ethers.provider.getTransactionCount(signerAddress);
        await newCommunityHub.adminManageCommunity(
            ethers.toBigInt(i),
            metadata,
            census,
            guardiansArray,
            createElectionPermission,
            community?.disabled ?? false,
            community?.funds ?? ethers.toBigInt(0),
            {nonce: nonce}
        )

        await new Promise(resolve => setTimeout(resolve, 30000));

        // check if community was created
        let newCommunity = await newCommunityHub.getCommunity(i);        
        console.log(`Migrated community: `, newCommunity.metadata.name);

        break; // remove for migration of all communities
    }

    await new Promise(resolve => setTimeout(resolve, 30000));
    console.log();
    console.log(`Communities migrated.`);
}

async function migrateResults(signerAddress: string) {
    const communityCount = await currentCommunityHub.getNextCommunityId();
    for (let i = 0; i < communityCount; i++) {
        let community = await currentCommunityHub.getCommunity(i);
        if (community.disabled) {
            console.log(`Community ${i} is disabled. Skipping migration of results.`);
            continue;
        }
        let electionIds = [];
        try {
            const response = await fetch(`${farcaster_vote_polls_by_community_endpoint}${i}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch polls for community ${i}`);
            }
            const data = await response.json();
            const polls = data.polls;

            if (!polls) {
                console.log('No polls for community ', i);
                continue;
            }
            for (const poll of polls) {
                electionIds.push(`0x`+poll.electionId);
            }
        } catch (error) {
            console.error(`Error fetching polls for community ${i}:`, error);
        }
        console.log('Election IDs for community ', i, ` are: `, electionIds);
        if (electionIds.length === 0) {
            continue;
        }
        for (let electionId of electionIds) {
            let electionResults = await currentCommunityHub.getResult(ethers.toBigInt(i), electionId);

            let optionsArray: Array<string> = Array.from(electionResults.options);
            let tallyArray: Array<Array<BigNumber>> = Array.from(electionResults.tally).map(tally => Array.from(tally));
            let participantsArray: Array<BigNumber> = Array.from(electionResults.participants);

            let electionResult: IElectionResults.IResult.ResultStruct = {
                question: electionResults.question,
                options: optionsArray,
                date: electionResults.date,
                tally: tallyArray,
                turnout: electionResults.turnout,
                totalVotingPower: electionResults.totalVotingPower,
                participants: participantsArray,
                censusRoot: electionResults.censusRoot,
                censusURI: electionResults.censusURI,
            }

            // console.log election result
            console.log(`Migrating results for community `, i, ` election `, electionId);
            console.log(`########################################`);

            console.log(`Question: `, electionResult.question);
            console.log(`Options: `, electionResult.options);
            console.log(`Date: `, electionResult.date);
            console.log(`Tally: `, electionResult.tally);
            console.log(`Turnout: `, electionResult.turnout);
            console.log(`Total Voting Power: `, electionResult.totalVotingPower);
            console.log(`Participants: `, electionResult.participants);
            console.log(`Census Root: `, electionResult.censusRoot);
            console.log(`Census URI: `, electionResult.censusURI);

            let nonce = await ethers.provider.getTransactionCount(signerAddress);
            let sr = await newCommunityHub.setResult(ethers.toBigInt(i), electionId, electionResult, {nonce: nonce});
            sr.wait();
            console.log(`Migrated results for community `, i, ` election `, electionId);
            
            await new Promise(resolve => setTimeout(resolve, 30000));
            
            break; // remove for migration of all results
        }

        console.log("All results for community ", i, " migrated.");

        break; // remove for migration of all communities
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});