// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {ICommunityHub} from "./ICommunityHub.sol";



contract CommunityHub is Ownable, ICommunityHub {

    constructor() Ownable(msg.sender) {}

    // create community
    function CreateCommunity(
        CommunityMetadata memory metadata,
        Census memory census,
        uint256[] memory guardians,
        address electionResultsContract,
        CreateElectionPermission createElectionPermission
    ) public override returns (uint256) {
        return 0;
    }

    // delete community
    function DeleteCommunity(uint256 communityId) public override onlyOwner {}

    // admin manage community
    function AdminManageCommunity(
        uint256 communityId,
        CommunityMetadata memory metadata,
        Census memory census,
        uint256[] memory guardians,
        address electionResultsContract,
        CreateElectionPermission createElectionPermission
    ) public override onlyOwner {}

    // set metadata
    function SetMetadata(uint256 communityId, CommunityMetadata memory metadata) public override onlyGuardian(communityId) {}

    // add guardian
    function AddGuardian(uint256 communityId, address guardian) public override onlyGuardian(communityId) {}

    // remove guardian
    function RemoveGuardian(uint256 communityId, address guardian) public override onlyGuardian(communityId) {}

    // add census
    function AddCensus(uint256 communityId, Census memory census) public override onlyGuardian(communityId) {}

    // remove census
    function RemoveCensus(uint256 communityId) public override onlyGuardian(communityId) {}

    // set election results contract
    function SetElectionResultsContract(uint256 communityId, address electionResultsContract) public override onlyGuardian(communityId) {}

    // set create election permission
    function SetCreateElectionPermission(uint256 communityId, CreateElectionPermission createElectionPermission) public override onlyGuardian(communityId) {}

    // set notifiable elections
    function SetNotifiableElections(uint256 communityId, bool notifiableElections) public override onlyGuardian(communityId) {}

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
    ) public override onlyGuardian(communityId) {}

    function GetElectionResults(uint256 communityId, string memory electionId) public view override returns (
        string memory question,
        string[] memory options,
        string memory date,
        uint256[][] memory tally,
        uint256 turnout,
        string[] memory participants,
        bytes memory action,
        bytes32 censusRoot,
        string memory censusURI
    ) {}
}
