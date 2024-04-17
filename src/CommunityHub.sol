// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {ICommunityHub} from "./ICommunityHub.sol";
import {IElectionResults} from "./IElectionResults.sol";

contract CommunityHub is Ownable, ICommunityHub, IElectionResults {

    constructor() Ownable(msg.sender) {}

    mapping(uint256 => Community) private communities;
    uint256 private createCommunityPrice;
    uint256 private nextCommunityId;
    address private defaultElectionResultsContract;

    /// @inheritdoc ICommunityHub
    function GetCommunity(uint256 _communityId) public view override returns (Community memory) {
        return communities[_communityId];
    }

    /// @inheritdoc ICommunityHub
    function GetCreateCommunityPrice() public view override returns (uint256) {
        return createCommunityPrice;
    }

    /// @inheritdoc ICommunityHub
    function GetDefaultElectionResultsContract() public view override returns (address) {
        return defaultElectionResultsContract;
    }

    /// @inheritdoc ICommunityHub
    function GetNextCommunityId() public view override returns (uint256) {
        return nextCommunityId;
    }

    /// @inheritdoc ICommunityHub
    function CreateCommunity(
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        address _electionResultsContract,
        CreateElectionPermission _createElectionPermission
    ) public payable override returns (uint256) {
        if (msg.value != createCommunityPrice) revert AmountMismatch({expected: createCommunityPrice, actual: msg.value});
        emit Deposit(msg.sender, msg.value);
        
        uint256 communityId = nextCommunityId;
        Community storage community = communities[communityId];
        community.metadata = _metadata;
        community.census = _census;
        community.electionResultsContract = _electionResultsContract;
        community.createElectionPermission = _createElectionPermission;
        community.disabled = false;
        for (uint i = 0; i < _guardians.length; ++i) {
            community.guardians.push(_guardians[i]);
        }

        nextCommunityId++;
        emit CommunityCreated(communityId, msg.sender);

        return communityId;
    }

    /// @inheritdoc ICommunityHub
    function AdminManageCommunity(
        uint256 _communityId,
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        address _electionResultsContract,
        CreateElectionPermission _createElectionPermission,
        bool _disabled
    ) public override onlyOwner {
        Community storage community = communities[_communityId];
        community.metadata = _metadata;
        community.census = _census;
        community.electionResultsContract = _electionResultsContract;
        community.createElectionPermission = _createElectionPermission;
        community.disabled = _disabled;
        delete community.guardians;
        for (uint i = 0; i < _guardians.length; ++i) {
            community.guardians.push(_guardians[i]);
        }
        emit AdminCommunityManaged(_communityId);
    }

    /// @inheritdoc ICommunityHub
    function AdminSetCommunityPrice(uint256 _price) public override onlyOwner {
        createCommunityPrice = _price;
        emit CreateCommunityPriceSet(_price);
    }

    /// @inheritdoc ICommunityHub
    function AdminSetDefaultElectionResultsContract(address _electionResultsContract) public override onlyOwner {
        defaultElectionResultsContract = _electionResultsContract;
        emit DefaultElectionResultsContractSet(_electionResultsContract);
    }

    /// @inheritdoc ICommunityHub
    function SetMetadata(uint256 _communityId, CommunityMetadata calldata _metadata) public override {
        communities[_communityId].metadata = _metadata;
        emit MetadataSet(_communityId, _metadata);
    }

    /// @inheritdoc ICommunityHub
    function AddGuardian(uint256 _communityId, uint256 _guardian) public override {
        communities[_communityId].guardians.push(_guardian);
        emit GuardianAdded(_communityId, _guardian);
    }

    /// @inheritdoc ICommunityHub
    function RemoveGuardian(uint256 _communityId, uint256 _guardian) public override {
        uint256[] storage guardians = communities[_communityId].guardians;
        for (uint256 i = 0; i < guardians.length; i++) {
            if (guardians[i] == _guardian) {
                guardians[i] = guardians[guardians.length - 1];
                guardians.pop();
                emit GuardianRemoved(_communityId, _guardian);
                return;
            }
        }
        revert GuardianNotFound({guardian: _guardian});
    }

    /// @inheritdoc ICommunityHub
    function SetCensus(uint256 _communityId, Census calldata _census) public override {
        communities[_communityId].census = _census;
        emit CensusSet(_communityId, _census);
    }

    /// @inheritdoc ICommunityHub
    function SetElectionResultsContract(uint256 _communityId, address _electionResultsContract) public override {
        communities[_communityId].electionResultsContract = _electionResultsContract;
        emit ElectionResultsContractSet(_communityId, _electionResultsContract);
    }

    /// @inheritdoc ICommunityHub
    function SetCreateElectionPermission(uint256 _communityId, CreateElectionPermission _createElectionPermission) public override {
        communities[_communityId].createElectionPermission = _createElectionPermission;
        emit CreateElectionPermissionSet(_communityId, _createElectionPermission);
    }

    /// @inheritdoc ICommunityHub
    function SetNotifiableElections(uint256 _communityId, bool _notifiableElections) public override {
        communities[_communityId].metadata.notifications = _notifiableElections;
        emit NotifiableElectionsSet(_communityId, _notifiableElections);
    }

    /// @inheritdoc IElectionResults
    function setResult(uint256 _communityId, bytes32 _electionId, Result calldata _result) public override onlyOwner() {
        IElectionResults electionResults = IElectionResults(communities[_communityId].electionResultsContract);
        electionResults.setResult(_communityId, _electionId, _result);
    }

    /// @inheritdoc IElectionResults
    function getResult(uint256 _communityId, bytes32 _electionId) public view override returns (Result memory) {
        IElectionResults electionResults = IElectionResults(communities[_communityId].electionResultsContract);
        return electionResults.getResult(_communityId, _electionId);
    }

    /// @notice Emits the `Deposit` event to track deposits that weren't made via the deposit method.
    /// @dev This call is bound by the gas limitations for `send`/`transfer` calls introduced by [ERC-2929](https://eips.ethereum.org/EIPS/eip-2929).
    /// Gas cost increases in future hard forks might break this function. As an alternative, [ERC-2930](https://eips.ethereum.org/EIPS/eip-2930)-type transactions using access lists can be employed.
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}
