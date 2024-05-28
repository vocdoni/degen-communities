// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

interface ICommunityHub {

    /// @notice Thrown if the amount is zero.
    error ZeroAmount();

    /// @notice Thrown if there is a mismatch between the expected and actually deposited amount.
    /// @param expected The expected amount.
    /// @param actual The actual amount deposited.
    error AmountMismatch(uint256 expected, uint256 actual);

    /// @notice Thrown if the guardian is not found.
    /// @param guardian The guardian not found.
    error GuardianNotFound(uint256 guardian);

    /// @notice Thrown if the create election permission is invalid.
    error InvalidCreateElectionPermission();

    /// @notice Emitted when a deposit has been made.
    /// @param sender The address of the sender.
    /// @param amount The amount deposited.
    /// @param communityId The ID of the community.
    event CommunityDeposit(address sender, uint256 amount, uint256 communityId);

    /// @notice Emitted when a deposit has been made but is not tied to a community.
    /// @param sender The address of the sender.
    /// @param amount The amount deposited.
    event Deposit(address sender, uint256 amount);

    /// @notice Emitted when a community has been created.
    /// @param communityId The ID of the created community.
    /// @param creator The address of the community creator.
    event CommunityCreated(uint256 communityId, address creator);

    /// @notice Emitted when a community price set.
    /// @param price The price to create a community.
    event CreateCommunityPriceSet(uint256 price);

    /// @notice Emmitted when the price per election has been set.
    /// @param price The price per election.
    event PricePerElectionSet(uint256 price);

    /// @notice Emitted when contract balance has been withdrawn.
    /// @param amount The amount withdrawn.
    event Withdrawal(uint256 amount, address to);

    /// @notice Emitted when a community has been managed by the admin.
    /// @param communityId The ID of the community.
    event AdminCommunityManaged(uint256 communityId);

    /// @notice Emitted when the metadata of a community has been set.
    /// @param communityId The ID of the community.
    /// @param metadata The metadata of the community.
    event MetadataSet(uint256 communityId, CommunityMetadata metadata);

    /// @notice Emitted when a guardian has been added to a community.
    /// @param communityId The ID of the community.
    /// @param guardian The guardian added.
    event GuardianAdded(uint256 communityId, uint256 guardian);

    /// @notice Emitted when a guardian has been removed from a community.
    /// @param communityId The ID of the community.
    /// @param guardian The guardian removed.
    event GuardianRemoved(uint256 communityId, uint256 guardian);

    /// @notice Emitted when a census has been set to a community.
    /// @param communityId The ID of the community.
    /// @param census The census set.
    event CensusSet(uint256 communityId, Census census);

    /// @notice Emitted when the permission to create elections in a community has been set.
    /// @param communityId The ID of the community.
    /// @param createElectionPermission The permission to create elections.
    event CreateElectionPermissionSet(uint256 communityId, CreateElectionPermission createElectionPermission);

    /// @notice Emitted when a community notifiable elections has been set.
    /// @param communityId The ID of the community.
    /// @param notifiableElections Whether the community has notifiable elections.
    event NotifiableElectionsSet(uint256 communityId, bool notifiableElections);

    /// @notice Emitted when a community has been disabled.
    /// @param communityId The ID of the community.
    event CommunityDisabled(uint256 communityId);

    /// @notice Emitted when a community has been enabled.
    /// @param communityId The ID of the community.
    event CommunityEnabled(uint256 communityId);

    /// @notice Indicates who can create an election.
    enum CreateElectionPermission {
        GUARDIAN, /// Only guardians can create elections.
        CENSUS    /// Only the users in the community census can create elections.
    }

    /// @notice Represents a census type.
    enum CensusType {
        FC,         /// All Farcaster users.
        CHANNEL,    /// Users in a specific channel.
        FOLLOWERS,  /// Users following a specific account. It can be used also for followers out of Farcaster, for example, from AlfaFrens.
        CSV,        /// Users in a CSV file.
        ERC20,      /// Users holding a specific ERC20 token.
        NFT         /// Users holding a specific NFT.
    }

    /// @notice Represents a token.
    /// @param blockchain The blockchain where the token is live.
    /// @param contractAddress The address of the token contract.
    struct Token {
        string blockchain;
        address contractAddress;
    }

    /// @notice Represents a census.
    /// @param censusType The type of the census.
    /// @param tokens The tokens that will be used to create the census.
    /// @param channel The Farcaster channel for the census.
    struct Census {
        CensusType censusType; /// The type of the census.
        Token[] tokens;        /// The tokens that will be used to create the census.
        string channel;        /// The Farcaster channel for the census. It can be used to store the user Farcaster FID (fid:32512) or the Alfafrens ref (alfafrens:0x123456789) for followers censuses.
    }

    /// @notice Represents the metadata of a community.
    /// @param name The name of the community.
    /// @param imageURI The URI of the image representing the community.
    /// @param groupChatURL The URL of the group chat of the community.
    /// @param channels The channels of the community.
    /// @param notifications Whether the community has notifications enabled.
    struct CommunityMetadata {
        string name;
        string imageURI;
        string groupChatURL;
        string[] channels;
        bool notifications;
    }

    /// @notice Represents a community.
    /// @param metadata The metadata of the community.
    /// @param census The census of the community.
    /// @param guardians The guardians of the community represented by their respective Farcaster ID.
    /// @param createElectionPermission The permission to create elections.
    /// @param disabled Whether the community is disabled.
    /// @param funds The funds of the community.
    struct Community {
        CommunityMetadata metadata;
        Census census;
        uint256[] guardians;
        CreateElectionPermission createElectionPermission;
        bool disabled;
        uint256 funds;
    }

    /// @notice Gets the price to create a community.
    function getCreateCommunityPrice() external view returns (uint256);

    /// @notice Gets the price per election.
    function getPricePerElection() external view returns (uint256);
    
    /// @notice Gets a community.
    function getCommunity(uint256 _communityId) external view returns (Community memory);

    /// @notice Gets the next community ID.
    function getNextCommunityId() external view returns (uint256);
    
    /// @notice Creates a new community.
    /// @param _metadata The metadata of the community.
    /// @param _census The census of the community.
    /// @param _guardians The guardians of the community represented by their respective Farcaster ID.
    /// @param _createElectionPermission The permission to create elections.
    function createCommunity(
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        CreateElectionPermission _createElectionPermission
    ) external payable;

    /// @notice Admin function to manage a community.
    /// @param _communityId The ID of the community to manage.
    /// @param _metadata The metadata of the community.
    /// @param _census The census of the community.
    /// @param _guardians The guardians of the community represented by their respective Farcaster ID.
    /// @param _createElectionPermission The permission to create elections.
    /// @param _disabled Whether the community is disabled.
    function adminManageCommunity(
        uint256 _communityId,
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        CreateElectionPermission _createElectionPermission,
        bool _disabled
    ) external;

    /// @notice Sets the price to create a community.
    function adminSetCommunityPrice(uint256 _price) external;

    /// @notice Sets the price per election.
    function adminSetPricePerElection(uint256 _price) external;

    /// @notice Sets the metadata of a community.
    /// @param _communityId The ID of the community.
    /// @param _metadata The metadata of the community.
    function setMetadata(uint256 _communityId, CommunityMetadata calldata _metadata) external;

    /// @notice Adds a guardian to a community.
    /// @param _communityId The ID of the community.
    /// @param _guardian The guardian to add.
    function addGuardian(uint256 _communityId, uint256 _guardian) external;

    /// @notice Removes a guardian from a community.
    /// @param _communityId The ID of the community.
    /// @param _guardian The guardian to remove.
    function removeGuardian(uint256 _communityId, uint256 _guardian) external;

    /// @notice Sets a census to a community.
    /// @param _communityId The ID of the community.
    /// @param _census The census to add.
    function setCensus(uint256 _communityId, Census calldata _census) external;

    /// @notice Sets the permission to create elections in a community.
    /// @param _communityId The ID of the community.
    /// @param _createElectionPermission The permission to create elections.
    function setCreateElectionPermission(uint256 _communityId, CreateElectionPermission _createElectionPermission) external;

    /// @notice Sets whether a community has notifiable elections.
    /// @param _communityId The ID of the community.
    /// @param _notifiableElections Whether the community has notifiable elections.
    function setNotifiableElections(uint256 _communityId, bool _notifiableElections) external;

    /// @notice Withdraws the contract balance.
    function withdraw() external;

    /// @notice Deposits tokens to the CommunityHub contract with a reference to a Community.
    /// @param _communityId The reference describing the deposit reason.
    function deposit(uint256 _communityId) external payable;
}
