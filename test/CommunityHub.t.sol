// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {CommunityHub} from "../src/CommunityHub.sol";
import {CommunityHubV2} from "../src/CommunityHubV2.sol";
import {IResult} from "../src/IResult.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {Options} from "openzeppelin-foundry-upgrades/Options.sol";

contract CommunityHubTest is CommunityHub, Test {
    CommunityHub public communityHub;
    CommunityHubV2 public communityHubV2;
    address payable public proxy;

    address pproxy =
        Upgrades.deployUUPSProxy("CommunityHub.sol", abi.encodeWithSelector(CommunityHub.initialize.selector));

    function setUp() public {
        proxy = payable(pproxy);
        communityHub = CommunityHub(proxy);
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

        tokens[0] = Token({blockchain: "ethereum", contractAddress: 0x2B3006D34359F3C23429167a659b18cC9c6F8bcA});

        census = Census({censusType: CensusType.ERC20, tokens: tokens, channel: "/vote"});

        guardians[0] = 10080;

        communityHub.createCommunity(metadata, census, guardians, CreateElectionPermission.CENSUS);
        if (communityHub.getNextCommunityId() != 2) {
            revert("Expected next community id to be 2");
        }

        Community memory community = communityHub.getCommunity(1);

        if (keccak256(abi.encodePacked(community.metadata.name)) != keccak256(abi.encodePacked("Test Community"))) {
            revert("Expected community name to be Test Community");
        }
        if (keccak256(abi.encodePacked(community.metadata.channels[0])) != keccak256(abi.encodePacked("c1"))) {
            revert("Expected channel to be c1");
        }
        if (keccak256(abi.encodePacked(community.metadata.channels[1])) != keccak256(abi.encodePacked("c2"))) {
            revert("Expected channel to be c2");
        }
        if (community.metadata.notifications != true) {
            revert("Expected notifications to be true");
        }
        if (
            keccak256(abi.encodePacked(community.census.tokens[0].blockchain))
                != keccak256(abi.encodePacked("ethereum"))
        ) {
            revert("Expected blockchain to be ethereum");
        }
        if (
            keccak256(abi.encodePacked(community.census.tokens[0].contractAddress))
                != keccak256(abi.encodePacked(0x2B3006D34359F3C23429167a659b18cC9c6F8bcA))
        ) {
            revert("Expected contract address to be 0x2B3006D34359F3C23429167a659b18cC9c6F8bcA");
        }
        if (keccak256(abi.encodePacked(community.census.channel)) != keccak256(abi.encodePacked("/vote"))) {
            revert("Expected channel to be /vote");
        }
        if (community.census.censusType != CensusType.ERC20) {
            revert("Expected census type to be ERC20");
        }
    }

    function test_SetResult() public {
        string[] memory options = new string[](3);
        uint256[][] memory tally = new uint256[][](1);
        uint256[] memory participants = new uint256[](5);
        IResult.Result memory result;

        bytes32 electionId = keccak256(abi.encodePacked("election1"));
        bytes32 censusRoot = keccak256(abi.encodePacked("censusRoot"));
        string memory question = "What is your favorite color?";
        string memory date = "2022-01-01";
        string memory censusURI = "ipfs://";

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

        communityHub.setResult(1, electionId, result);
        IResult.Result memory result2 = communityHub.getResult(1, electionId);
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

    function test_reinitialize() public {
        vm.expectRevert(InvalidInitialization.selector);
        communityHub.initialize();
    }

    function test_upgrade() public {
        // create a community in the old implementation
        test_CreateCommunity();

        console.log("Proxy address:", proxy);
        console.log("Current implementation address:", Upgrades.getImplementationAddress(proxy));

        Options memory opts;
        opts.referenceContract = "CommunityHub.sol";
        Upgrades.upgradeProxy(pproxy, "CommunityHubV2.sol", "", opts);

        console.log("New implementation address:", Upgrades.getImplementationAddress(proxy));

        // check new implementation propagates storage correctly
        communityHubV2 = CommunityHubV2(proxy);

        // create a community in the new implementation
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

        tokens[0] = Token({blockchain: "ethereum", contractAddress: 0x2B3006D34359F3C23429167a659b18cC9c6F8bcA});

        census = Census({censusType: CensusType.ERC20, tokens: tokens, channel: "/vote"});

        guardians[0] = 10080;

        communityHubV2.createCommunity(metadata, census, guardians, CreateElectionPermission.CENSUS);
        if (communityHubV2.getNextCommunityId() != 3) {
            revert("Expected next community id to be 3");
        }

        // check not reinitialize v2
        vm.expectRevert(InvalidInitialization.selector);
        communityHubV2.initialize();
    }
}
