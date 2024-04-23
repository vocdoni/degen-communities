// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

import {IResult} from "./IResult.sol";

interface IElectionResults {

    event ResultsSet(uint256 communityId, bytes32 electionId);

    /// @notice Set the results of an election.
    /// @param _communityId The ID of the community.
    /// @param _electionId The ID of the election.
    /// @param _result The results of the election.
    function setResult(uint256 _communityId, bytes32 _electionId, IResult.Result calldata _result) external;

    /// @notice Get the results of an election.
    /// @param _communityId The ID of the community.
    /// @param _electionId The ID of the election.
    /// @return result The results of the election.
    function getResult(uint256 _communityId, bytes32 _electionId) external view returns (IResult.Result memory result);
}