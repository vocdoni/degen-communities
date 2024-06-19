import { ethers, BigNumber } from "hardhat";
import dotenv from "dotenv";

import { CommunityHub, CommunityHub__factory, ICommunityHub, IElectionResults } from "../typechain";

dotenv.config();

let currentCommunityHub: CommunityHub;
let newCommunityHub: CommunityHub;

let communityHubAddress = process.env.CURRENT_COMMUNITY_HUB_CONTRACT_ADDRESS || "";
let newCommunityHubAddress = process.env.NEW_COMMUNITY_HUB_CONTRACT_ADDRESS || "";
let degenRPC = process.env.DEGEN_RPC_URL || "";

let baseRPC = process.env.BASE_RPC_URL || "";

let signerPrivateKey = process.env.PRIVATE_KEY || "";

let farcaster_vote_backend = process.env.VOTE_FRAME_BACKEND_URL || "";
let farcaster_vote_polls_by_community_endpoint = farcaster_vote_backend + "/rankings/pollsByCommunity/";

async function main() {
    const providerDegen = new ethers.JsonRpcProvider(degenRPC);
    const signerDegen = new ethers.Wallet(signerPrivateKey, providerDegen);
    const signerAddressDegen = await signerDegen.getAddress();
    console.log("Using signer with address for Degen Chain:", signerAddressDegen);

    const providerBase = new ethers.JsonRpcProvider(baseRPC);
    const signerBase = new ethers.Wallet(signerPrivateKey, providerBase);
    const signerAddressBase = await signerBase.getAddress();
    console.log("Using signer with address for Base :", signerAddressBase);
    console.log();

    currentCommunityHub = CommunityHub__factory.connect(communityHubAddress, signerDegen);
    newCommunityHub = CommunityHub__factory.connect(newCommunityHubAddress, signerBase);
    
    // UNCOMMENT FOR MIGRATION

    // migrate community
    // await migrateCommunity(signerAddressBase, 0);
    
    // finalize migration with admin tx
    // await adminMigratedCommunityFinalize(signerAddressBase, 0);
    
    // get election ids for community
    // await getElectionIds(0);
    
    // migrate results for election
    // await migrateResults(signerAddressBase, 0, "0x1");
}

async function migrateCommunity(signerAddress: string, communityId: number) {
    let community: ICommunityHub.CommunityStructOutput = await currentCommunityHub.getCommunity(ethers.toBigInt(communityId));

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

    console.log(`Migrating community ${communityId}:`);
    console.log(`########################################`);

    console.log(`Metadata: `, metadata);
    console.log(`Census: `, census);
    console.log(`Guardians: `, guardiansArray.map(guardian => guardian.toString()));
    console.log(`Create Election Permission: `, createElectionPermission.toString());
    console.log(`Disabled: `, community?.disabled ?? false);
    console.log(`Funds: `, community?.funds ?? ethers.toBigInt(0));

    console.log();

    let nonce = await ethers.provider.getTransactionCount(signerAddress);
    
    let tx = await newCommunityHub.createCommunity(
        metadata,
        census,
        guardiansArray,
        createElectionPermission,
        {nonce: nonce}
    )
    tx.wait();
    console.log(`tx hash: `, tx.hash);
    await new Promise(resolve => setTimeout(resolve, 10000));

    // check if community was created
    let newCommunity = await newCommunityHub.getCommunity(communityId);        
    console.log(`Migrated community: `, newCommunity.metadata.name);
}

async function adminMigratedCommunityFinalize(signerAddress: string, communityId: number) {
    let community: ICommunityHub.CommunityStructOutput = await currentCommunityHub.getCommunity(ethers.toBigInt(communityId));

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

    console.log(`Admin finalize migrating community ${communityId}:`);
    console.log(`########################################`);

    console.log(`Metadata: `, metadata);
    console.log(`Census: `, census);
    console.log(`Guardians: `, guardiansArray.map(guardian => guardian.toString()));
    console.log(`Create Election Permission: `, createElectionPermission.toString());
    console.log(`Disabled: `, community?.disabled ?? false);
    console.log(`Funds: `, community?.funds ?? ethers.toBigInt(0));

    console.log();

    let nonce = await ethers.provider.getTransactionCount(signerAddress);
    let tx = await newCommunityHub.adminManageCommunity(
        ethers.toBigInt(communityId),
        metadata,
        census,
        guardiansArray,
        createElectionPermission,
        community?.disabled ?? false,
        community?.funds ?? ethers.toBigInt(0),
        {nonce: nonce}
    )
    tx.wait();
    console.log(`tx hash: `, tx.hash);

    await new Promise(resolve => setTimeout(resolve, 10000));

    // check if community was updated
    let newCommunity = await newCommunityHub.getCommunity(communityId);        
    console.log(`Admin finalized migrate community: `, newCommunity.metadata.name);
}

async function getElectionIds(communityId: number) {
    let electionIds = [];
    try {
        const response = await fetch(`${farcaster_vote_polls_by_community_endpoint}${communityId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch polls for community ${communityId}`);
        }
        const data = await response.json();
        const polls = data.polls;

        if (!polls) {
            console.log('No polls for community ', communityId);
            return;
        }
        for (const poll of polls) {
            electionIds.push(`0x`+poll.electionId);
        }
    } catch (error) {
        console.error(`Error fetching polls for community ${communityId}:`, error);
    }
    if (electionIds.length === 0) {
        console.log('No election IDs for community ', communityId);
    }
    console.log('Election IDs for community ', communityId, ` are: `, electionIds);
}


async function migrateResults(signerAddress: string, communityId: number, electionId: string) {
    let community = await currentCommunityHub.getCommunity(ethers.toBigInt(communityId));
    if (community.disabled) {
        console.log(`Community ${communityId} is disabled. Skipping migration of results.`);
        return;
    }
    
    if (electionId === "") {
        console.error(`Election ID is required to migrate results for community `, communityId);
        return;
    }
    let electionResults = await currentCommunityHub.getResult(ethers.toBigInt(communityId), electionId);

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

    console.log(`Migrating results for community `, communityId, ` election `, electionId);
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
    let tx = await newCommunityHub.setResult(ethers.toBigInt(communityId), electionId, electionResult, {nonce: nonce});
    tx.wait();
    console.log(`tx hash: `, tx.hash);

    await new Promise(resolve => setTimeout(resolve, 10000));

    // check if results were migrated
    let newElectionResult = await newCommunityHub.getResult(ethers.toBigInt(communityId), electionId);
    if (newElectionResult.question === electionResult.question) {
        console.log(`Migrated results for community `, communityId, ` election `, electionId);
    } else {
        console.error(`Failed to migrate results for community `, communityId, ` election `, electionId);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});