// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

abstract contract ICommunityHub {

    modifier onlyGuardian(uint256 communityId) {
        // TODO: Implement
        _;
    }

    mapping(uint256 => Community) private communities;

    enum CreateElectionPermission {
        GUARDIAN,
        CENSUS
    }

    struct Token {
        string blockchain;
        address contractAddress;
    }

    enum CensusType {
        FC,
        CHANNEL,
        FOLLOWERS,
        CSV,
        ERC20,
        NFT
    }

    struct Census {
        CensusType censusType;
        Token[] tokens;
    }

    struct CommunityMetadata {
        string name;
        string imageURI;
        string[] channels;
        bool notifications;
    }

    struct Community {
        CommunityMetadata metadata;
        Census census;
        uint256[] guardians; // FIDs
        address electionResultsContract;
        CreateElectionPermission createElectionPermission;
    }

    // isGuardian
    function _isGuardian(uint256 communityId, uint256 guardian) private view returns (bool) {
        return true; // TODO: Implement
    }

    // create community
    function CreateCommunity(
        CommunityMetadata memory metadata,
        Census memory census,
        uint256[] memory guardians,
        address electionResultsContract,
        CreateElectionPermission createElectionPermission
    ) external virtual returns (uint256);

    // delete community
    function DeleteCommunity(uint256 communityId) external virtual;

    // admin manage community
    function AdminManageCommunity(
        uint256 communityId,
        CommunityMetadata memory metadata,
        Census memory census,
        uint256[] memory guardians,
        address electionResultsContract,
        CreateElectionPermission createElectionPermission
    ) external virtual;

    // set metadata
    function SetMetadata(uint256 communityId, CommunityMetadata memory metadata) external virtual;

    // add guardian
    function AddGuardian(uint256 communityId, address guardian) external virtual;

    // remove guardian
    function RemoveGuardian(uint256 communityId, address guardian) external virtual;

    // add census
    function AddCensus(uint256 communityId, Census memory census) external virtual;

    // remove census
    function RemoveCensus(uint256 communityId) external virtual;

    // set election results contract
    function SetElectionResultsContract(uint256 communityId, address electionResultsContract) external virtual;

    // set create election permission
    function SetCreateElectionPermission(uint256 communityId, CreateElectionPermission createElectionPermission) external virtual;

    // set notifiable elections
    function SetNotifiableElections(uint256 communityId, bool notifiableElections) external virtual;

    // set election results
    function SetElectionResults(
        uint256 communityId,
        bytes32 electionId,
        string memory question,
        string[] memory options,
        string memory date,
        uint256[][] memory tally,
        uint256 turnout,
        string[] memory participants,
        bytes memory action,
        bytes32 censusRoot,
        string memory censusURI
    ) external virtual;

    function GetElectionResults(uint256 communityId, string memory electionId) external virtual view returns (
        string memory question,
        string[] memory options,
        string memory date,
        uint256[][] memory tally,
        uint256 turnout,
        string[] memory participants,
        bytes memory action,
        bytes32 censusRoot,
        string memory censusURI
    );
}