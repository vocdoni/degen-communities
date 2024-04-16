// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract ElectionResults is Ownable {

    constructor(address owner) Ownable(owner) {}

    struct Result {
        string question;
        string[] options;
        string date;
        uint256[][] tally;
        uint256 turnout;
        uint256 totalVotingPower;
        string[] participants;
        bytes action;
        bytes32 censusRoot;
        string censusURI;
    }

    // CommunityId => ElectionId => Result
    mapping(bytes32 => mapping(bytes32 => Result)) public results;

    // set results
    function setResult(bytes32 communityId, bytes32 electionId, Result memory result) public onlyOwner {
        results[communityId][electionId] = result;
    }

    // get results
    function getResult(bytes32 communityId, bytes32 electionId) public view returns (Result memory) {
        return results[communityId][electionId];
    }
}
