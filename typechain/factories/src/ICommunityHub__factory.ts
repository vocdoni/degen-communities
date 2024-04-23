/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ICommunityHub,
  ICommunityHubInterface,
} from "../../src/ICommunityHub";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actual",
        type: "uint256",
      },
    ],
    name: "AmountMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "guardian",
        type: "uint256",
      },
    ],
    name: "GuardianNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCreateElectionPermission",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
    ],
    name: "AdminCommunityManaged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum ICommunityHub.CensusType",
            name: "censusType",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "string",
                name: "blockchain",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
            ],
            internalType: "struct ICommunityHub.Token[]",
            name: "tokens",
            type: "tuple[]",
          },
          {
            internalType: "string",
            name: "channel",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct ICommunityHub.Census",
        name: "census",
        type: "tuple",
      },
    ],
    name: "CensusSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "CommunityCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
    ],
    name: "CommunityDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
    ],
    name: "CommunityDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
    ],
    name: "CommunityEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "CreateCommunityPriceSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ICommunityHub.CreateElectionPermission",
        name: "createElectionPermission",
        type: "uint8",
      },
    ],
    name: "CreateElectionPermissionSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "guardian",
        type: "uint256",
      },
    ],
    name: "GuardianAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "guardian",
        type: "uint256",
      },
    ],
    name: "GuardianRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "groupChatURL",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "channels",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "notifications",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct ICommunityHub.CommunityMetadata",
        name: "metadata",
        type: "tuple",
      },
    ],
    name: "MetadataSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "notifiableElections",
        type: "bool",
      },
    ],
    name: "NotifiableElectionsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PricePerElectionSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_guardian",
        type: "uint256",
      },
    ],
    name: "addGuardian",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "groupChatURL",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "channels",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "notifications",
            type: "bool",
          },
        ],
        internalType: "struct ICommunityHub.CommunityMetadata",
        name: "_metadata",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum ICommunityHub.CensusType",
            name: "censusType",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "string",
                name: "blockchain",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
            ],
            internalType: "struct ICommunityHub.Token[]",
            name: "tokens",
            type: "tuple[]",
          },
          {
            internalType: "string",
            name: "channel",
            type: "string",
          },
        ],
        internalType: "struct ICommunityHub.Census",
        name: "_census",
        type: "tuple",
      },
      {
        internalType: "uint256[]",
        name: "_guardians",
        type: "uint256[]",
      },
      {
        internalType: "enum ICommunityHub.CreateElectionPermission",
        name: "_createElectionPermission",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "_disabled",
        type: "bool",
      },
    ],
    name: "adminManageCommunity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "adminSetCommunityPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "adminSetPricePerElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "groupChatURL",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "channels",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "notifications",
            type: "bool",
          },
        ],
        internalType: "struct ICommunityHub.CommunityMetadata",
        name: "_metadata",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum ICommunityHub.CensusType",
            name: "censusType",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "string",
                name: "blockchain",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
            ],
            internalType: "struct ICommunityHub.Token[]",
            name: "tokens",
            type: "tuple[]",
          },
          {
            internalType: "string",
            name: "channel",
            type: "string",
          },
        ],
        internalType: "struct ICommunityHub.Census",
        name: "_census",
        type: "tuple",
      },
      {
        internalType: "uint256[]",
        name: "_guardians",
        type: "uint256[]",
      },
      {
        internalType: "enum ICommunityHub.CreateElectionPermission",
        name: "_createElectionPermission",
        type: "uint8",
      },
    ],
    name: "createCommunity",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
    ],
    name: "getCommunity",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "imageURI",
                type: "string",
              },
              {
                internalType: "string",
                name: "groupChatURL",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "channels",
                type: "string[]",
              },
              {
                internalType: "bool",
                name: "notifications",
                type: "bool",
              },
            ],
            internalType: "struct ICommunityHub.CommunityMetadata",
            name: "metadata",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "enum ICommunityHub.CensusType",
                name: "censusType",
                type: "uint8",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "blockchain",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "contractAddress",
                    type: "address",
                  },
                ],
                internalType: "struct ICommunityHub.Token[]",
                name: "tokens",
                type: "tuple[]",
              },
              {
                internalType: "string",
                name: "channel",
                type: "string",
              },
            ],
            internalType: "struct ICommunityHub.Census",
            name: "census",
            type: "tuple",
          },
          {
            internalType: "uint256[]",
            name: "guardians",
            type: "uint256[]",
          },
          {
            internalType: "enum ICommunityHub.CreateElectionPermission",
            name: "createElectionPermission",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "disabled",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "funds",
            type: "uint256",
          },
        ],
        internalType: "struct ICommunityHub.Community",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreateCommunityPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNextCommunityId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPricePerElection",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_guardian",
        type: "uint256",
      },
    ],
    name: "removeGuardian",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum ICommunityHub.CensusType",
            name: "censusType",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "string",
                name: "blockchain",
                type: "string",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
            ],
            internalType: "struct ICommunityHub.Token[]",
            name: "tokens",
            type: "tuple[]",
          },
          {
            internalType: "string",
            name: "channel",
            type: "string",
          },
        ],
        internalType: "struct ICommunityHub.Census",
        name: "_census",
        type: "tuple",
      },
    ],
    name: "setCensus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
      {
        internalType: "enum ICommunityHub.CreateElectionPermission",
        name: "_createElectionPermission",
        type: "uint8",
      },
    ],
    name: "setCreateElectionPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "groupChatURL",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "channels",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "notifications",
            type: "bool",
          },
        ],
        internalType: "struct ICommunityHub.CommunityMetadata",
        name: "_metadata",
        type: "tuple",
      },
    ],
    name: "setMetadata",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_communityId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_notifiableElections",
        type: "bool",
      },
    ],
    name: "setNotifiableElections",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ICommunityHub__factory {
  static readonly abi = _abi;
  static createInterface(): ICommunityHubInterface {
    return new Interface(_abi) as ICommunityHubInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ICommunityHub {
    return new Contract(address, _abi, runner) as unknown as ICommunityHub;
  }
}
