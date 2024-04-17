/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace ICommunityHub {
  export type TokenStruct = {
    blockchain: string;
    contractAddress: AddressLike;
  };

  export type TokenStructOutput = [
    blockchain: string,
    contractAddress: string
  ] & { blockchain: string; contractAddress: string };

  export type CensusStruct = {
    censusType: BigNumberish;
    tokens: ICommunityHub.TokenStruct[];
  };

  export type CensusStructOutput = [
    censusType: bigint,
    tokens: ICommunityHub.TokenStructOutput[]
  ] & { censusType: bigint; tokens: ICommunityHub.TokenStructOutput[] };

  export type CommunityMetadataStruct = {
    name: string;
    imageURI: string;
    channels: string[];
    notifications: boolean;
  };

  export type CommunityMetadataStructOutput = [
    name: string,
    imageURI: string,
    channels: string[],
    notifications: boolean
  ] & {
    name: string;
    imageURI: string;
    channels: string[];
    notifications: boolean;
  };

  export type CommunityStruct = {
    metadata: ICommunityHub.CommunityMetadataStruct;
    census: ICommunityHub.CensusStruct;
    guardians: BigNumberish[];
    electionResultsContract: AddressLike;
    createElectionPermission: BigNumberish;
    disabled: boolean;
  };

  export type CommunityStructOutput = [
    metadata: ICommunityHub.CommunityMetadataStructOutput,
    census: ICommunityHub.CensusStructOutput,
    guardians: bigint[],
    electionResultsContract: string,
    createElectionPermission: bigint,
    disabled: boolean
  ] & {
    metadata: ICommunityHub.CommunityMetadataStructOutput;
    census: ICommunityHub.CensusStructOutput;
    guardians: bigint[];
    electionResultsContract: string;
    createElectionPermission: bigint;
    disabled: boolean;
  };
}

export interface ICommunityHubInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "AddGuardian"
      | "AdminManageCommunity"
      | "AdminSetCommunityPrice"
      | "AdminSetDefaultElectionResultsContract"
      | "CreateCommunity"
      | "GetCommunity"
      | "GetCreateCommunityPrice"
      | "GetDefaultElectionResultsContract"
      | "GetNextCommunityId"
      | "RemoveGuardian"
      | "SetCensus"
      | "SetCreateElectionPermission"
      | "SetElectionResultsContract"
      | "SetMetadata"
      | "SetNotifiableElections"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AdminCommunityManaged"
      | "CensusSet"
      | "CommunityCreated"
      | "CreateCommunityPriceSet"
      | "CreateElectionPermissionSet"
      | "DefaultElectionResultsContractSet"
      | "Deposit"
      | "ElectionResultsContractSet"
      | "GuardianAdded"
      | "GuardianRemoved"
      | "MetadataSet"
      | "NotifiableElectionsSet"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "AddGuardian",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "AdminManageCommunity",
    values: [
      BigNumberish,
      ICommunityHub.CommunityMetadataStruct,
      ICommunityHub.CensusStruct,
      BigNumberish[],
      AddressLike,
      BigNumberish,
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "AdminSetCommunityPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "AdminSetDefaultElectionResultsContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "CreateCommunity",
    values: [
      ICommunityHub.CommunityMetadataStruct,
      ICommunityHub.CensusStruct,
      BigNumberish[],
      AddressLike,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "GetCommunity",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "GetCreateCommunityPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "GetDefaultElectionResultsContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "GetNextCommunityId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "RemoveGuardian",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "SetCensus",
    values: [BigNumberish, ICommunityHub.CensusStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "SetCreateElectionPermission",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "SetElectionResultsContract",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "SetMetadata",
    values: [BigNumberish, ICommunityHub.CommunityMetadataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "SetNotifiableElections",
    values: [BigNumberish, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "AddGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "AdminManageCommunity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "AdminSetCommunityPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "AdminSetDefaultElectionResultsContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CreateCommunity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "GetCommunity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "GetCreateCommunityPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "GetDefaultElectionResultsContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "GetNextCommunityId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "RemoveGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "SetCensus", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "SetCreateElectionPermission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SetElectionResultsContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SetMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SetNotifiableElections",
    data: BytesLike
  ): Result;
}

export namespace AdminCommunityManagedEvent {
  export type InputTuple = [communityId: BigNumberish];
  export type OutputTuple = [communityId: bigint];
  export interface OutputObject {
    communityId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CensusSetEvent {
  export type InputTuple = [
    communityId: BigNumberish,
    census: ICommunityHub.CensusStruct
  ];
  export type OutputTuple = [
    communityId: bigint,
    census: ICommunityHub.CensusStructOutput
  ];
  export interface OutputObject {
    communityId: bigint;
    census: ICommunityHub.CensusStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CommunityCreatedEvent {
  export type InputTuple = [communityId: BigNumberish, creator: AddressLike];
  export type OutputTuple = [communityId: bigint, creator: string];
  export interface OutputObject {
    communityId: bigint;
    creator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CreateCommunityPriceSetEvent {
  export type InputTuple = [price: BigNumberish];
  export type OutputTuple = [price: bigint];
  export interface OutputObject {
    price: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CreateElectionPermissionSetEvent {
  export type InputTuple = [
    communityId: BigNumberish,
    createElectionPermission: BigNumberish
  ];
  export type OutputTuple = [
    communityId: bigint,
    createElectionPermission: bigint
  ];
  export interface OutputObject {
    communityId: bigint;
    createElectionPermission: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DefaultElectionResultsContractSetEvent {
  export type InputTuple = [electionResultsContract: AddressLike];
  export type OutputTuple = [electionResultsContract: string];
  export interface OutputObject {
    electionResultsContract: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DepositEvent {
  export type InputTuple = [sender: AddressLike, amount: BigNumberish];
  export type OutputTuple = [sender: string, amount: bigint];
  export interface OutputObject {
    sender: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ElectionResultsContractSetEvent {
  export type InputTuple = [
    communityId: BigNumberish,
    electionResultsContract: AddressLike
  ];
  export type OutputTuple = [
    communityId: bigint,
    electionResultsContract: string
  ];
  export interface OutputObject {
    communityId: bigint;
    electionResultsContract: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GuardianAddedEvent {
  export type InputTuple = [communityId: BigNumberish, guardian: BigNumberish];
  export type OutputTuple = [communityId: bigint, guardian: bigint];
  export interface OutputObject {
    communityId: bigint;
    guardian: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GuardianRemovedEvent {
  export type InputTuple = [communityId: BigNumberish, guardian: BigNumberish];
  export type OutputTuple = [communityId: bigint, guardian: bigint];
  export interface OutputObject {
    communityId: bigint;
    guardian: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MetadataSetEvent {
  export type InputTuple = [
    communityId: BigNumberish,
    metadata: ICommunityHub.CommunityMetadataStruct
  ];
  export type OutputTuple = [
    communityId: bigint,
    metadata: ICommunityHub.CommunityMetadataStructOutput
  ];
  export interface OutputObject {
    communityId: bigint;
    metadata: ICommunityHub.CommunityMetadataStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NotifiableElectionsSetEvent {
  export type InputTuple = [
    communityId: BigNumberish,
    notifiableElections: boolean
  ];
  export type OutputTuple = [communityId: bigint, notifiableElections: boolean];
  export interface OutputObject {
    communityId: bigint;
    notifiableElections: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ICommunityHub extends BaseContract {
  connect(runner?: ContractRunner | null): ICommunityHub;
  waitForDeployment(): Promise<this>;

  interface: ICommunityHubInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  AddGuardian: TypedContractMethod<
    [_communityId: BigNumberish, _guardian: BigNumberish],
    [void],
    "nonpayable"
  >;

  AdminManageCommunity: TypedContractMethod<
    [
      _communityId: BigNumberish,
      _metadata: ICommunityHub.CommunityMetadataStruct,
      _census: ICommunityHub.CensusStruct,
      _guardians: BigNumberish[],
      _electionResultsContract: AddressLike,
      _createElectionPermission: BigNumberish,
      _disabled: boolean
    ],
    [void],
    "nonpayable"
  >;

  AdminSetCommunityPrice: TypedContractMethod<
    [_price: BigNumberish],
    [void],
    "nonpayable"
  >;

  AdminSetDefaultElectionResultsContract: TypedContractMethod<
    [_electionResultsContract: AddressLike],
    [void],
    "nonpayable"
  >;

  CreateCommunity: TypedContractMethod<
    [
      _metadata: ICommunityHub.CommunityMetadataStruct,
      _census: ICommunityHub.CensusStruct,
      _guardians: BigNumberish[],
      _electionResultsContract: AddressLike,
      _createElectionPermission: BigNumberish
    ],
    [bigint],
    "payable"
  >;

  GetCommunity: TypedContractMethod<
    [_communityId: BigNumberish],
    [ICommunityHub.CommunityStructOutput],
    "view"
  >;

  GetCreateCommunityPrice: TypedContractMethod<[], [bigint], "view">;

  GetDefaultElectionResultsContract: TypedContractMethod<[], [string], "view">;

  GetNextCommunityId: TypedContractMethod<[], [bigint], "view">;

  RemoveGuardian: TypedContractMethod<
    [_communityId: BigNumberish, _guardian: BigNumberish],
    [void],
    "nonpayable"
  >;

  SetCensus: TypedContractMethod<
    [_communityId: BigNumberish, _census: ICommunityHub.CensusStruct],
    [void],
    "nonpayable"
  >;

  SetCreateElectionPermission: TypedContractMethod<
    [_communityId: BigNumberish, _createElectionPermission: BigNumberish],
    [void],
    "nonpayable"
  >;

  SetElectionResultsContract: TypedContractMethod<
    [_communityId: BigNumberish, _electionResultsContract: AddressLike],
    [void],
    "nonpayable"
  >;

  SetMetadata: TypedContractMethod<
    [
      _communityId: BigNumberish,
      _metadata: ICommunityHub.CommunityMetadataStruct
    ],
    [void],
    "nonpayable"
  >;

  SetNotifiableElections: TypedContractMethod<
    [_communityId: BigNumberish, _notifiableElections: boolean],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "AddGuardian"
  ): TypedContractMethod<
    [_communityId: BigNumberish, _guardian: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "AdminManageCommunity"
  ): TypedContractMethod<
    [
      _communityId: BigNumberish,
      _metadata: ICommunityHub.CommunityMetadataStruct,
      _census: ICommunityHub.CensusStruct,
      _guardians: BigNumberish[],
      _electionResultsContract: AddressLike,
      _createElectionPermission: BigNumberish,
      _disabled: boolean
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "AdminSetCommunityPrice"
  ): TypedContractMethod<[_price: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "AdminSetDefaultElectionResultsContract"
  ): TypedContractMethod<
    [_electionResultsContract: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "CreateCommunity"
  ): TypedContractMethod<
    [
      _metadata: ICommunityHub.CommunityMetadataStruct,
      _census: ICommunityHub.CensusStruct,
      _guardians: BigNumberish[],
      _electionResultsContract: AddressLike,
      _createElectionPermission: BigNumberish
    ],
    [bigint],
    "payable"
  >;
  getFunction(
    nameOrSignature: "GetCommunity"
  ): TypedContractMethod<
    [_communityId: BigNumberish],
    [ICommunityHub.CommunityStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "GetCreateCommunityPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "GetDefaultElectionResultsContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "GetNextCommunityId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "RemoveGuardian"
  ): TypedContractMethod<
    [_communityId: BigNumberish, _guardian: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "SetCensus"
  ): TypedContractMethod<
    [_communityId: BigNumberish, _census: ICommunityHub.CensusStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "SetCreateElectionPermission"
  ): TypedContractMethod<
    [_communityId: BigNumberish, _createElectionPermission: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "SetElectionResultsContract"
  ): TypedContractMethod<
    [_communityId: BigNumberish, _electionResultsContract: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "SetMetadata"
  ): TypedContractMethod<
    [
      _communityId: BigNumberish,
      _metadata: ICommunityHub.CommunityMetadataStruct
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "SetNotifiableElections"
  ): TypedContractMethod<
    [_communityId: BigNumberish, _notifiableElections: boolean],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "AdminCommunityManaged"
  ): TypedContractEvent<
    AdminCommunityManagedEvent.InputTuple,
    AdminCommunityManagedEvent.OutputTuple,
    AdminCommunityManagedEvent.OutputObject
  >;
  getEvent(
    key: "CensusSet"
  ): TypedContractEvent<
    CensusSetEvent.InputTuple,
    CensusSetEvent.OutputTuple,
    CensusSetEvent.OutputObject
  >;
  getEvent(
    key: "CommunityCreated"
  ): TypedContractEvent<
    CommunityCreatedEvent.InputTuple,
    CommunityCreatedEvent.OutputTuple,
    CommunityCreatedEvent.OutputObject
  >;
  getEvent(
    key: "CreateCommunityPriceSet"
  ): TypedContractEvent<
    CreateCommunityPriceSetEvent.InputTuple,
    CreateCommunityPriceSetEvent.OutputTuple,
    CreateCommunityPriceSetEvent.OutputObject
  >;
  getEvent(
    key: "CreateElectionPermissionSet"
  ): TypedContractEvent<
    CreateElectionPermissionSetEvent.InputTuple,
    CreateElectionPermissionSetEvent.OutputTuple,
    CreateElectionPermissionSetEvent.OutputObject
  >;
  getEvent(
    key: "DefaultElectionResultsContractSet"
  ): TypedContractEvent<
    DefaultElectionResultsContractSetEvent.InputTuple,
    DefaultElectionResultsContractSetEvent.OutputTuple,
    DefaultElectionResultsContractSetEvent.OutputObject
  >;
  getEvent(
    key: "Deposit"
  ): TypedContractEvent<
    DepositEvent.InputTuple,
    DepositEvent.OutputTuple,
    DepositEvent.OutputObject
  >;
  getEvent(
    key: "ElectionResultsContractSet"
  ): TypedContractEvent<
    ElectionResultsContractSetEvent.InputTuple,
    ElectionResultsContractSetEvent.OutputTuple,
    ElectionResultsContractSetEvent.OutputObject
  >;
  getEvent(
    key: "GuardianAdded"
  ): TypedContractEvent<
    GuardianAddedEvent.InputTuple,
    GuardianAddedEvent.OutputTuple,
    GuardianAddedEvent.OutputObject
  >;
  getEvent(
    key: "GuardianRemoved"
  ): TypedContractEvent<
    GuardianRemovedEvent.InputTuple,
    GuardianRemovedEvent.OutputTuple,
    GuardianRemovedEvent.OutputObject
  >;
  getEvent(
    key: "MetadataSet"
  ): TypedContractEvent<
    MetadataSetEvent.InputTuple,
    MetadataSetEvent.OutputTuple,
    MetadataSetEvent.OutputObject
  >;
  getEvent(
    key: "NotifiableElectionsSet"
  ): TypedContractEvent<
    NotifiableElectionsSetEvent.InputTuple,
    NotifiableElectionsSetEvent.OutputTuple,
    NotifiableElectionsSetEvent.OutputObject
  >;

  filters: {
    "AdminCommunityManaged(uint256)": TypedContractEvent<
      AdminCommunityManagedEvent.InputTuple,
      AdminCommunityManagedEvent.OutputTuple,
      AdminCommunityManagedEvent.OutputObject
    >;
    AdminCommunityManaged: TypedContractEvent<
      AdminCommunityManagedEvent.InputTuple,
      AdminCommunityManagedEvent.OutputTuple,
      AdminCommunityManagedEvent.OutputObject
    >;

    "CensusSet(uint256,tuple)": TypedContractEvent<
      CensusSetEvent.InputTuple,
      CensusSetEvent.OutputTuple,
      CensusSetEvent.OutputObject
    >;
    CensusSet: TypedContractEvent<
      CensusSetEvent.InputTuple,
      CensusSetEvent.OutputTuple,
      CensusSetEvent.OutputObject
    >;

    "CommunityCreated(uint256,address)": TypedContractEvent<
      CommunityCreatedEvent.InputTuple,
      CommunityCreatedEvent.OutputTuple,
      CommunityCreatedEvent.OutputObject
    >;
    CommunityCreated: TypedContractEvent<
      CommunityCreatedEvent.InputTuple,
      CommunityCreatedEvent.OutputTuple,
      CommunityCreatedEvent.OutputObject
    >;

    "CreateCommunityPriceSet(uint256)": TypedContractEvent<
      CreateCommunityPriceSetEvent.InputTuple,
      CreateCommunityPriceSetEvent.OutputTuple,
      CreateCommunityPriceSetEvent.OutputObject
    >;
    CreateCommunityPriceSet: TypedContractEvent<
      CreateCommunityPriceSetEvent.InputTuple,
      CreateCommunityPriceSetEvent.OutputTuple,
      CreateCommunityPriceSetEvent.OutputObject
    >;

    "CreateElectionPermissionSet(uint256,uint8)": TypedContractEvent<
      CreateElectionPermissionSetEvent.InputTuple,
      CreateElectionPermissionSetEvent.OutputTuple,
      CreateElectionPermissionSetEvent.OutputObject
    >;
    CreateElectionPermissionSet: TypedContractEvent<
      CreateElectionPermissionSetEvent.InputTuple,
      CreateElectionPermissionSetEvent.OutputTuple,
      CreateElectionPermissionSetEvent.OutputObject
    >;

    "DefaultElectionResultsContractSet(address)": TypedContractEvent<
      DefaultElectionResultsContractSetEvent.InputTuple,
      DefaultElectionResultsContractSetEvent.OutputTuple,
      DefaultElectionResultsContractSetEvent.OutputObject
    >;
    DefaultElectionResultsContractSet: TypedContractEvent<
      DefaultElectionResultsContractSetEvent.InputTuple,
      DefaultElectionResultsContractSetEvent.OutputTuple,
      DefaultElectionResultsContractSetEvent.OutputObject
    >;

    "Deposit(address,uint256)": TypedContractEvent<
      DepositEvent.InputTuple,
      DepositEvent.OutputTuple,
      DepositEvent.OutputObject
    >;
    Deposit: TypedContractEvent<
      DepositEvent.InputTuple,
      DepositEvent.OutputTuple,
      DepositEvent.OutputObject
    >;

    "ElectionResultsContractSet(uint256,address)": TypedContractEvent<
      ElectionResultsContractSetEvent.InputTuple,
      ElectionResultsContractSetEvent.OutputTuple,
      ElectionResultsContractSetEvent.OutputObject
    >;
    ElectionResultsContractSet: TypedContractEvent<
      ElectionResultsContractSetEvent.InputTuple,
      ElectionResultsContractSetEvent.OutputTuple,
      ElectionResultsContractSetEvent.OutputObject
    >;

    "GuardianAdded(uint256,uint256)": TypedContractEvent<
      GuardianAddedEvent.InputTuple,
      GuardianAddedEvent.OutputTuple,
      GuardianAddedEvent.OutputObject
    >;
    GuardianAdded: TypedContractEvent<
      GuardianAddedEvent.InputTuple,
      GuardianAddedEvent.OutputTuple,
      GuardianAddedEvent.OutputObject
    >;

    "GuardianRemoved(uint256,uint256)": TypedContractEvent<
      GuardianRemovedEvent.InputTuple,
      GuardianRemovedEvent.OutputTuple,
      GuardianRemovedEvent.OutputObject
    >;
    GuardianRemoved: TypedContractEvent<
      GuardianRemovedEvent.InputTuple,
      GuardianRemovedEvent.OutputTuple,
      GuardianRemovedEvent.OutputObject
    >;

    "MetadataSet(uint256,tuple)": TypedContractEvent<
      MetadataSetEvent.InputTuple,
      MetadataSetEvent.OutputTuple,
      MetadataSetEvent.OutputObject
    >;
    MetadataSet: TypedContractEvent<
      MetadataSetEvent.InputTuple,
      MetadataSetEvent.OutputTuple,
      MetadataSetEvent.OutputObject
    >;

    "NotifiableElectionsSet(uint256,bool)": TypedContractEvent<
      NotifiableElectionsSetEvent.InputTuple,
      NotifiableElectionsSetEvent.OutputTuple,
      NotifiableElectionsSetEvent.OutputObject
    >;
    NotifiableElectionsSet: TypedContractEvent<
      NotifiableElectionsSetEvent.InputTuple,
      NotifiableElectionsSetEvent.OutputTuple,
      NotifiableElectionsSetEvent.OutputObject
    >;
  };
}
