// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ICommunityHub} from "./ICommunityHub.sol";
import {IResult} from "./IResult.sol";
import {IElectionResults} from "./IElectionResults.sol";

contract CommunityHubV2 is Initializable, OwnableUpgradeable, UUPSUpgradeable, ICommunityHub, IElectionResults {
    using IResult for IResult.Result;

    // CommunityId => Community
    mapping(uint256 => Community) private communities;
    // CommunityId => ElectionId => Result
    mapping(uint256 => mapping(bytes32 => IResult.Result)) private results;
    uint256 private createCommunityPrice;
    uint256 private pricePerElection;
    uint256 private nextCommunityId;

    // Version 2
    uint256 private newVariableV2;

    function initialize() public initializer {
        __UUPSUpgradeable_init();
        __Ownable_init(msg.sender);
    }

    /// @inheritdoc ICommunityHub
    function getCommunity(uint256 _communityId) public view override returns (Community memory) {
        return communities[_communityId];
    }

    /// @inheritdoc ICommunityHub
    function getCreateCommunityPrice() public view override returns (uint256) {
        return createCommunityPrice;
    }

    /// @inheritdoc ICommunityHub
    function getPricePerElection() public view override returns (uint256) {
        return pricePerElection;
    }

    /// @inheritdoc ICommunityHub
    function getNextCommunityId() public view override returns (uint256) {
        return nextCommunityId;
    }

    /// @inheritdoc ICommunityHub
    function createCommunity(
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        CreateElectionPermission _createElectionPermission
    ) external payable override {
        if (
            _createElectionPermission != CreateElectionPermission.CENSUS
                && _createElectionPermission != CreateElectionPermission.GUARDIAN
        ) {
            revert InvalidCreateElectionPermission();
        }

        uint256 communityId = nextCommunityId;

        if (msg.value != createCommunityPrice) {
            revert AmountMismatch({expected: createCommunityPrice, actual: msg.value});
        }
        emit CommunityDeposit(msg.sender, msg.value, communityId);

        Community storage community = communities[communityId];
        community.metadata = _metadata;
        community.census = _census;
        community.createElectionPermission = _createElectionPermission;
        community.disabled = false;
        community.funds = msg.value;
        for (uint256 i = 0; i < _guardians.length; ++i) {
            community.guardians.push(_guardians[i]);
        }

        nextCommunityId++;
        emit CommunityCreated(communityId, msg.sender);
    }

    /// @inheritdoc ICommunityHub
    function adminManageCommunity(
        uint256 _communityId,
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        CreateElectionPermission _createElectionPermission,
        bool _disabled
    ) external override onlyOwner {
        Community storage community = communities[_communityId];
        community.metadata = _metadata;
        community.census = _census;
        community.createElectionPermission = _createElectionPermission;
        if (!community.disabled && _disabled) {
            community.disabled = true;
            emit CommunityDisabled(_communityId);
        } else if (community.disabled && !_disabled) {
            community.disabled = false;
            emit CommunityEnabled(_communityId);
        }
        delete community.guardians;
        for (uint256 i = 0; i < _guardians.length; ++i) {
            community.guardians.push(_guardians[i]);
        }
        emit AdminCommunityManaged(_communityId);
    }

    /// @inheritdoc ICommunityHub
    function adminSetCommunityPrice(uint256 _price) external override onlyOwner {
        createCommunityPrice = _price;
        emit CreateCommunityPriceSet(_price);
    }

    /// @inheritdoc ICommunityHub
    function adminSetPricePerElection(uint256 _price) external override onlyOwner {
        pricePerElection = _price;
        emit PricePerElectionSet(_price);
    }

    /// @inheritdoc ICommunityHub
    function setMetadata(uint256 _communityId, CommunityMetadata calldata _metadata) external override onlyOwner {
        communities[_communityId].metadata = _metadata;
        emit MetadataSet(_communityId, _metadata);
    }

    /// @inheritdoc ICommunityHub
    function addGuardian(uint256 _communityId, uint256 _guardian) external override onlyOwner {
        communities[_communityId].guardians.push(_guardian);
        emit GuardianAdded(_communityId, _guardian);
    }

    /// @inheritdoc ICommunityHub
    function removeGuardian(uint256 _communityId, uint256 _guardian) external override onlyOwner {
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
    function setCensus(uint256 _communityId, Census calldata _census) external override onlyOwner {
        communities[_communityId].census = _census;
        emit CensusSet(_communityId, _census);
    }

    /// @inheritdoc ICommunityHub
    function setCreateElectionPermission(uint256 _communityId, CreateElectionPermission _createElectionPermission)
        external
        override
        onlyOwner
    {
        communities[_communityId].createElectionPermission = _createElectionPermission;
        emit CreateElectionPermissionSet(_communityId, _createElectionPermission);
    }

    /// @inheritdoc ICommunityHub
    function setNotifiableElections(uint256 _communityId, bool _notifiableElections) external override onlyOwner {
        communities[_communityId].metadata.notifications = _notifiableElections;
        emit NotifiableElectionsSet(_communityId, _notifiableElections);
    }

    /// @inheritdoc IElectionResults
    function setResult(uint256 _communityId, bytes32 _electionId, IResult.Result calldata _result)
        external
        override
        onlyOwner
    {
        require(!communities[_communityId].disabled, "Community is disabled");
        require(communities[_communityId].funds >= pricePerElection, "Insufficient funds for this operation");

        communities[_communityId].funds -= pricePerElection;

        if (communities[_communityId].funds < pricePerElection) {
            communities[_communityId].disabled = true; // Disable community if not enough funds for next election
            emit CommunityDisabled(_communityId);
        }

        IResult.Result memory r;
        r.question = _result.question;
        r.options = _result.options;
        r.date = _result.date;
        r.tally = _result.tally;
        r.turnout = _result.turnout;
        r.totalVotingPower = _result.totalVotingPower;
        r.participants = _result.participants;
        r.censusRoot = _result.censusRoot;
        r.censusURI = _result.censusURI;

        results[_communityId][_electionId] = r;

        emit ResultsSet(_communityId, _electionId);
    }

    /// @inheritdoc IElectionResults
    function getResult(uint256 _communityId, bytes32 _electionId)
        public
        view
        override
        returns (IResult.Result memory result)
    {
        return results[_communityId][_electionId];
    }

    /// @inheritdoc ICommunityHub
    function withdraw() external override onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No funds available");

        address payable recipient = payable(owner());

        (bool success,) = recipient.call{value: amount}("");
        require(success, "Failed to send Ether");

        emit Withdrawal(amount, recipient);
    }

    /// @inheritdoc ICommunityHub
    function deposit(uint256 _communityId) external payable override {
        if (msg.value == 0) revert ZeroAmount();

        communities[_communityId].funds += msg.value;

        if (communities[_communityId].disabled) {
            if (communities[_communityId].funds >= pricePerElection) {
                communities[_communityId].disabled = false;
                emit CommunityEnabled(_communityId);
            }
        }

        emit CommunityDeposit(msg.sender, msg.value, _communityId);
    }

    /// @notice Emits the `Deposit` event to track deposits that weren't made via the deposit method.
    /// @dev This call is bound by the gas limitations for `send`/`transfer` calls introduced by [ERC-2929](https://eips.ethereum.org/EIPS/eip-2929).
    /// Gas cost increases in future hard forks might break this function. As an alternative, [ERC-2930](https://eips.ethereum.org/EIPS/eip-2930)-type transactions using access lists can be employed.
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // Storage gap for future upgrades
    uint256[44] private __gap; // 50 total slots - 5 used slots = 45 slots gap
}
