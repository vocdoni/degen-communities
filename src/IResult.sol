// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

library IResult {
    /// @notice Struct to store the results of an election.
    /// @param question The question that was asked in the election.
    /// @param options The options that were available to vote on.
    /// @param date The date the election was held.
    /// @param tally The tally of votes for each option.
    /// @param turnout The number of participants in the election.
    /// @param totalVotingPower The total voting power of all participants.
    /// @param participants The Farcaster IDs of all participants.
    /// @param censusRoot The root hash of the Merkle tree of the census.
    /// @param censusURI The URI of the census.
    struct Result {
        string question;
        string[] options;
        string date;
        uint256[][] tally;
        uint256 turnout;
        uint256 totalVotingPower;
        uint256[] participants;
        bytes32 censusRoot;
        string censusURI;
    }
}