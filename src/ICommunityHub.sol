// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.24;

interface ICommunityHub {

    /// @notice Thrown if the deposit amount is zero.
    error ZeroAmount();

    /// @notice Thrown if there is a mismatch between the expected and actually deposited amount.
    /// @param expected The expected amount.
    /// @param actual The actual amount deposited.
    error AmountMismatch(uint256 expected, uint256 actual);

    /// @notice Thrown if the guardian is not found.
    /// @param guardian The guardian not found.
    error GuardianNotFound(uint256 guardian);

    /// @notice Emitted when a deposit has been made.
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

    /// @notice Emitted when a community has been managed by the admin.
    /// @param communityId The ID of the community.
    event AdminCommunityManaged(uint256 communityId);

    /// @notice Emitted when the default election results contract has been set.
    /// @param electionResultsContract The address of the election results contract.
    event DefaultElectionResultsContractSet(address electionResultsContract);

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

    /// @notice Emitted when the election results contract of a community has been set.
    /// @param communityId The ID of the community.
    /// @param electionResultsContract The address of the election results contract.
    event ElectionResultsContractSet(uint256 communityId, address electionResultsContract);

    /// @notice Emitted when the permission to create elections in a community has been set.
    /// @param communityId The ID of the community.
    /// @param createElectionPermission The permission to create elections.
    event CreateElectionPermissionSet(uint256 communityId, CreateElectionPermission createElectionPermission);

    /// @notice Emitted when a community notifiable elections has been set.
    /// @param communityId The ID of the community.
    /// @param notifiableElections Whether the community has notifiable elections.
    event NotifiableElectionsSet(uint256 communityId, bool notifiableElections);

    /// @notice Indicates who can create an election.
    enum CreateElectionPermission {
        GUARDIAN, /// Only guardians can create elections.
        CENSUS    /// Only the users in the community census can create elections.
    }

    /// @notice Represents a census type.
    enum CensusType {
        FC,         /// All Farcaster users.
        CHANNEL,    /// Users in a specific channel.
        FOLLOWERS,  /// Users following a specific account.
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
    struct Census {
        CensusType censusType; /// The type of the census.
        Token[] tokens;        /// The tokens that will be used to create the census.
    }

    /// @notice Represents the metadata of a community.
    /// @param name The name of the community.
    /// @param imageURI The URI of the image representing the community.
    /// @param channels The channels of the community.
    /// @param notifications Whether the community has notifications enabled.
    struct CommunityMetadata {
        string name;
        string imageURI;
        string[] channels;
        bool notifications;
    }

    /// @notice Represents a community.
    /// @param metadata The metadata of the community.
    /// @param census The census of the community.
    /// @param guardians The guardians of the community represented by their respective Farcaster ID.
    /// @param electionResultsContract The address of the election results contract.
    /// @param createElectionPermission The permission to create elections.
    /// @param disabled Whether the community is disabled.
    struct Community {
        CommunityMetadata metadata;
        Census census;
        uint256[] guardians;
        address electionResultsContract;
        CreateElectionPermission createElectionPermission;
        bool disabled;
    }
    
    /// @notice Creates a new community.
    /// @param _metadata The metadata of the community.
    /// @param _census The census of the community.
    /// @param _guardians The guardians of the community represented by their respective Farcaster ID.
    /// @param _electionResultsContract The address of the election results contract.
    /// @param _createElectionPermission The permission to create elections.
    /// @return The ID of the created community.
    function CreateCommunity(
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        address _electionResultsContract,
        CreateElectionPermission _createElectionPermission
    ) external payable returns (uint256);

    /// @notice Admin function to manage a community.
    /// @param _communityId The ID of the community to manage.
    /// @param _metadata The metadata of the community.
    /// @param _census The census of the community.
    /// @param _guardians The guardians of the community represented by their respective Farcaster ID.
    /// @param _electionResultsContract The address of the election results contract.
    /// @param _createElectionPermission The permission to create elections.
    /// @param _disabled Whether the community is disabled.
    function AdminManageCommunity(
        uint256 _communityId,
        CommunityMetadata calldata _metadata,
        Census calldata _census,
        uint256[] calldata _guardians,
        address _electionResultsContract,
        CreateElectionPermission _createElectionPermission,
        bool _disabled
    ) external;

    /// @notice Sets the price to create a community.
    function AdminSetCommunityPrice(uint256 _price) external;

    /// @notice Sets the default election results contract.
    function AdminSetDefaultElectionResultsContract(address _electionResultsContract) external;

    /// @notice Sets the metadata of a community.
    /// @param _communityId The ID of the community.
    /// @param _metadata The metadata of the community.
    function SetMetadata(uint256 _communityId, CommunityMetadata calldata _metadata) external;

    /// @notice Adds a guardian to a community.
    /// @param _communityId The ID of the community.
    /// @param _guardian The guardian to add.
    function AddGuardian(uint256 _communityId, uint256 _guardian) external;

    /// @notice Removes a guardian from a community.
    /// @param _communityId The ID of the community.
    /// @param _guardian The guardian to remove.
    function RemoveGuardian(uint256 _communityId, uint256 _guardian) external;

    /// @notice Sets a census to a community.
    /// @param _communityId The ID of the community.
    /// @param _census The census to add.
    function SetCensus(uint256 _communityId, Census calldata _census) external;

    /// @notice Sets the election results contract of a community.
    /// @param _communityId The ID of the community.
    /// @param _electionResultsContract The address of the election results contract.
    function SetElectionResultsContract(uint256 _communityId, address _electionResultsContract) external;

    /// @notice Sets the permission to create elections in a community.
    /// @param _communityId The ID of the community.
    /// @param _createElectionPermission The permission to create elections.
    function SetCreateElectionPermission(uint256 _communityId, CreateElectionPermission _createElectionPermission) external;

    /// @notice Sets whether a community has notifiable elections.
    /// @param _communityId The ID of the community.
    /// @param _notifiableElections Whether the community has notifiable elections.
    function SetNotifiableElections(uint256 _communityId, bool _notifiableElections) external;

    /*

    /// @notice Sets the election results of a community election.
    /// @param _communityId The ID of the community.
    /// @param _electionId The ID of the election.
    /// @param _question The question of the election.
    /// @param _options The options of the election question.
    /// @param _date The date of the election.
    /// @param _tally The tally of the election.
    /// @param _turnout The turnout of the election.
    /// @param _participants The participants of the election.
    /// @param _censusRoot The root of the census.
    /// @param _censusURI The URI of the census.
    function SetElectionResults(
        uint256 _communityId,
        bytes32 _electionId,
        string calldata _question,
        string[] calldata _options,
        string calldata _date,
        uint256[][] calldata _tally,
        uint256 _turnout,
        string[] calldata _participants,
        bytes32 _censusRoot,
        string calldata _censusURI
    ) external;

    /// @notice Gets the election results of a community election.
    /// @param _communityId The ID of the community.
    /// @param _electionId The ID of the election.
    /// @return question The question of the election.
    /// @return options The options of the election question.
    /// @return date The date of the election.
    /// @return tally The tally of the election.
    /// @return turnout The turnout of the election.
    /// @return participants The participants of the election.
    /// @return censusRoot The root of the census.
    /// @return censusURI The URI of the census.
    function GetElectionResults(uint256 _communityId, string calldata _electionId) external view returns (
        string memory question,
        string[] memory options,
        string memory date,
        uint256[][] memory tally,
        uint256 turnout,
        string[] memory participants,
        bytes32 censusRoot,
        string memory censusURI
    );

    */
}