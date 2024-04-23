// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {CommunityHub} from "../src/CommunityHub.sol";
import {IResult} from "../src/IResult.sol";

contract CommunityHubTest is CommunityHub {

    CommunityHub public communityHub;

    function setUp() public {
        communityHub = new CommunityHub();
    }

    function test_CreateCommunity() public {
        string[] memory channels = new string[](2);
        CommunityMetadata memory metadata;
        Token[] memory tokens = new Token[](1);
        Census memory census;
        uint256[] memory guardians = new uint256[](1);

        channels[0] = "c1";
        channels[1] = "c2";

        metadata = CommunityMetadata({
            name: "Test Community",
            imageURI: "ipfs://",
            groupChatURL: "t.me/test",
            channels: channels,
            notifications: true
        });

        tokens[0] = Token({
            blockchain: "ethereum",
            contractAddress: 0x2B3006D34359F3C23429167a659b18cC9c6F8bcA
        });

        census = Census({
            censusType: CensusType.ERC20,
            tokens: tokens,
            channel: "/vote"
        });

        guardians[0] = 10080;

        communityHub.createCommunity(metadata, census, guardians, CreateElectionPermission.CENSUS);
        if (communityHub.getNextCommunityId() != 1) {
            revert("Expected next community id to be 1");
        }
    }

    function test_SetResult() public {
        string[] memory channels = new string[](2);
        CommunityMetadata memory metadata;
        Token[] memory tokens = new Token[](1);
        Census memory census;
        uint256[] memory guardians = new uint256[](1);
        string[] memory options = new string[](3);
        uint256[][] memory tally = new uint256[][](1);    
        uint256[] memory participants = new uint256[](5);
        IResult.Result memory result;

        bytes32 electionId = keccak256(abi.encodePacked("election1"));
        bytes32 censusRoot = keccak256(abi.encodePacked("censusRoot"));
        string memory question = "What is your favorite color?";
        string memory date = "2022-01-01";
        string memory censusURI = "ipfs://";

        channels[0] = "c1";
        channels[1] = "c2";

        metadata = CommunityMetadata({
            name: "Test Community",
            imageURI: "ipfs://",
            groupChatURL: "t.me/test",
            channels: channels,
            notifications: true
        });

        tokens[0] = Token({
            blockchain: "ethereum",
            contractAddress: 0x2B3006D34359F3C23429167a659b18cC9c6F8bcA
        });

        census = Census({
            censusType: CensusType.ERC20,
            tokens: tokens,
            channel: "/vote"
        });

        guardians[0] = 10080;

        options[0] = "Red";
        options[1] = "Green";
        options[2] = "Blue";

        tally[0] = new uint256[](3);
        tally[0][0] = 1;
        tally[0][1] = 2;
        tally[0][2] = 3;

        participants[0] = 10080;
        participants[1] = 10081;
        participants[2] = 10082;
        participants[3] = 10083;
        participants[4] = 10084;

        result = IResult.Result({
            question: question,
            options: options,
            date: date,
            tally: tally,
            turnout: 100,
            totalVotingPower: 5,
            participants: participants,
            censusRoot: censusRoot,
            censusURI: censusURI
        });

        communityHub.createCommunity(metadata, census, guardians, CreateElectionPermission.CENSUS);

        communityHub.setResult(0, electionId, result);
        IResult.Result memory result2 = communityHub.getResult(0, electionId);
        if (result2.tally[0][0] != 1) {
            revert("Expected tally to be 1");
        }
        if (result2.tally[0][1] != 2) {
            revert("Expected tally to be 2");
        }
        if (result2.tally[0][2] != 3) {
            revert("Expected tally to be 3");
        }
        if (result2.turnout != 100) {
            revert("Expected turnout to be 100");
        }
        if (result2.totalVotingPower != 5) {
            revert("Expected total voting power to be 5");
        }
        if (result2.participants.length != 5) {
            revert("Expected 5 participants");
        }
        if (result2.censusRoot != censusRoot) {
            revert("Expected census root to be equal");
        }
    }
}