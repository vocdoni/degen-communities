// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {IElectionResults} from "./IElectionResults.sol";

contract ElectionResults is Ownable, IElectionResults {

    constructor() Ownable(msg.sender) {}

    // CommunityId => ElectionId => Result
    mapping(uint256 => mapping(bytes32 => Result)) private results;

    // set results
    function setResult(uint256 communityId, bytes32 electionId, Result memory result) public override onlyOwner {
        Result storage r = results[communityId][electionId];
        r.question = result.question;
        r.options = result.options;
        r.date = result.date;
        r.tally = result.tally;
        r.turnout = result.turnout;
        r.totalVotingPower = result.totalVotingPower;
        r.participants = result.participants;
        r.censusRoot = result.censusRoot;
        r.censusURI = result.censusURI;
        
        emit ResultsSet(communityId, electionId);
    }

    // get results
    function getResult(uint256 communityId, bytes32 electionId) public view override returns (Result memory) {
        return results[communityId][electionId];
    }
}
