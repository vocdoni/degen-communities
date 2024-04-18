/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ElectionResults,
  ElectionResultsInterface,
} from "../../src/ElectionResults";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        internalType: "bytes32",
        name: "electionId",
        type: "bytes32",
      },
    ],
    name: "ResultsSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "electionId",
        type: "bytes32",
      },
    ],
    name: "getResult",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "options",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
          {
            internalType: "uint256[][]",
            name: "tally",
            type: "uint256[][]",
          },
          {
            internalType: "uint256",
            name: "turnout",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVotingPower",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "participants",
            type: "uint256[]",
          },
          {
            internalType: "bytes32",
            name: "censusRoot",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "censusURI",
            type: "string",
          },
        ],
        internalType: "struct IElectionResults.Result",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "communityId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "electionId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "options",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
          {
            internalType: "uint256[][]",
            name: "tally",
            type: "uint256[][]",
          },
          {
            internalType: "uint256",
            name: "turnout",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalVotingPower",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "participants",
            type: "uint256[]",
          },
          {
            internalType: "bytes32",
            name: "censusRoot",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "censusURI",
            type: "string",
          },
        ],
        internalType: "struct IElectionResults.Result",
        name: "result",
        type: "tuple",
      },
    ],
    name: "setResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5033600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000885760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016200007f9190620001a9565b60405180910390fd5b6200009981620000a060201b60201c565b50620001c6565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001918262000164565b9050919050565b620001a38162000184565b82525050565b6000602082019050620001c0600083018462000198565b92915050565b6118ac80620001d66000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806313e862651461005c5780633c973f751461008c578063715018a6146100a85780638da5cb5b146100b2578063f2fde38b146100d0575b600080fd5b61007660048036038101906100719190610ab1565b6100ec565b6040516100839190610eba565b60405180910390f35b6100a660048036038101906100a1919061142d565b6104d0565b005b6100b0610600565b005b6100ba610614565b6040516100c791906114dd565b60405180910390f35b6100ea60048036038101906100e59190611524565b61063d565b005b6100f4610816565b6001600084815260200190815260200160002060008381526020019081526020016000206040518061012001604052908160008201805461013490611580565b80601f016020809104026020016040519081016040528092919081815260200182805461016090611580565b80156101ad5780601f10610182576101008083540402835291602001916101ad565b820191906000526020600020905b81548152906001019060200180831161019057829003601f168201915b5050505050815260200160018201805480602002602001604051908101604052809291908181526020016000905b828210156102875783829060005260206000200180546101fa90611580565b80601f016020809104026020016040519081016040528092919081815260200182805461022690611580565b80156102735780601f1061024857610100808354040283529160200191610273565b820191906000526020600020905b81548152906001019060200180831161025657829003601f168201915b5050505050815260200190600101906101db565b50505050815260200160028201805461029f90611580565b80601f01602080910402602001604051908101604052809291908181526020018280546102cb90611580565b80156103185780601f106102ed57610100808354040283529160200191610318565b820191906000526020600020905b8154815290600101906020018083116102fb57829003601f168201915b5050505050815260200160038201805480602002602001604051908101604052809291908181526020016000905b828210156103b8578382906000526020600020018054806020026020016040519081016040528092919081815260200182805480156103a457602002820191906000526020600020905b815481526020019060010190808311610390575b505050505081526020019060010190610346565b50505050815260200160048201548152602001600582015481526020016006820180548060200260200160405190810160405280929190818152602001828054801561042357602002820191906000526020600020905b81548152602001906001019080831161040f575b505050505081526020016007820154815260200160088201805461044690611580565b80601f016020809104026020016040519081016040528092919081815260200182805461047290611580565b80156104bf5780601f10610494576101008083540402835291602001916104bf565b820191906000526020600020905b8154815290600101906020018083116104a257829003601f168201915b505050505081525050905092915050565b6104d86106c3565b600060016000858152602001908152602001600020600084815260200190815260200160002090508160000151816000019081610515919061175d565b508160200151816001019080519060200190610532929190610865565b508160400151816002019081610548919061175d565b5081606001518160030190805190602001906105659291906108be565b50816080015181600401819055508160a0015181600501819055508160c0015181600601908051906020019061059c92919061091e565b508160e0015181600701819055508161010001518160080190816105c0919061175d565b507f77deb32519991dda7821b0b9367f9124aa3fd934f4845bcfd5dc6fa3f192266384846040516105f292919061184d565b60405180910390a150505050565b6106086106c3565b610612600061074a565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6106456106c3565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036106b75760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016106ae91906114dd565b60405180910390fd5b6106c08161074a565b50565b6106cb61080e565b73ffffffffffffffffffffffffffffffffffffffff166106e9610614565b73ffffffffffffffffffffffffffffffffffffffff16146107485761070c61080e565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161073f91906114dd565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6040518061012001604052806060815260200160608152602001606081526020016060815260200160008152602001600081526020016060815260200160008019168152602001606081525090565b8280548282559060005260206000209081019282156108ad579160200282015b828111156108ac57825182908161089c919061175d565b5091602001919060010190610885565b5b5090506108ba919061096b565b5090565b82805482825590600052602060002090810192821561090d579160200282015b8281111561090c5782518290805190602001906108fc92919061091e565b50916020019190600101906108de565b5b50905061091a919061098f565b5090565b82805482825590600052602060002090810192821561095a579160200282015b8281111561095957825182559160200191906001019061093e565b5b50905061096791906109b3565b5090565b5b8082111561098b576000818161098291906109d0565b5060010161096c565b5090565b5b808211156109af57600081816109a69190610a10565b50600101610990565b5090565b5b808211156109cc5760008160009055506001016109b4565b5090565b5080546109dc90611580565b6000825580601f106109ee5750610a0d565b601f016020900490600052602060002090810190610a0c91906109b3565b5b50565b5080546000825590600052602060002090810190610a2e91906109b3565b50565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610a5881610a45565b8114610a6357600080fd5b50565b600081359050610a7581610a4f565b92915050565b6000819050919050565b610a8e81610a7b565b8114610a9957600080fd5b50565b600081359050610aab81610a85565b92915050565b60008060408385031215610ac857610ac7610a3b565b5b6000610ad685828601610a66565b9250506020610ae785828601610a9c565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610b2b578082015181840152602081019050610b10565b60008484015250505050565b6000601f19601f8301169050919050565b6000610b5382610af1565b610b5d8185610afc565b9350610b6d818560208601610b0d565b610b7681610b37565b840191505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610bb98383610b48565b905092915050565b6000602082019050919050565b6000610bd982610b81565b610be38185610b8c565b935083602082028501610bf585610b9d565b8060005b85811015610c315784840389528151610c128582610bad565b9450610c1d83610bc1565b925060208a01995050600181019050610bf9565b50829750879550505050505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610ca481610a45565b82525050565b6000610cb68383610c9b565b60208301905092915050565b6000602082019050919050565b6000610cda82610c6f565b610ce48185610c7a565b9350610cef83610c8b565b8060005b83811015610d20578151610d078882610caa565b9750610d1283610cc2565b925050600181019050610cf3565b5085935050505092915050565b6000610d398383610ccf565b905092915050565b6000602082019050919050565b6000610d5982610c43565b610d638185610c4e565b935083602082028501610d7585610c5f565b8060005b85811015610db15784840389528151610d928582610d2d565b9450610d9d83610d41565b925060208a01995050600181019050610d79565b50829750879550505050505092915050565b610dcc81610a7b565b82525050565b6000610120830160008301518482036000860152610df08282610b48565b91505060208301518482036020860152610e0a8282610bce565b91505060408301518482036040860152610e248282610b48565b91505060608301518482036060860152610e3e8282610d4e565b9150506080830151610e536080860182610c9b565b5060a0830151610e6660a0860182610c9b565b5060c083015184820360c0860152610e7e8282610ccf565b91505060e0830151610e9360e0860182610dc3565b50610100830151848203610100860152610ead8282610b48565b9150508091505092915050565b60006020820190508181036000830152610ed48184610dd2565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610f1982610b37565b810181811067ffffffffffffffff82111715610f3857610f37610ee1565b5b80604052505050565b6000610f4b610a31565b9050610f578282610f10565b919050565b600080fd5b600080fd5b600080fd5b600067ffffffffffffffff821115610f8657610f85610ee1565b5b610f8f82610b37565b9050602081019050919050565b82818337600083830152505050565b6000610fbe610fb984610f6b565b610f41565b905082815260208101848484011115610fda57610fd9610f66565b5b610fe5848285610f9c565b509392505050565b600082601f83011261100257611001610f61565b5b8135611012848260208601610fab565b91505092915050565b600067ffffffffffffffff82111561103657611035610ee1565b5b602082029050602081019050919050565b600080fd5b600061105f61105a8461101b565b610f41565b9050808382526020820190506020840283018581111561108257611081611047565b5b835b818110156110c957803567ffffffffffffffff8111156110a7576110a6610f61565b5b8086016110b48982610fed565b85526020850194505050602081019050611084565b5050509392505050565b600082601f8301126110e8576110e7610f61565b5b81356110f884826020860161104c565b91505092915050565b600067ffffffffffffffff82111561111c5761111b610ee1565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561114857611147610ee1565b5b602082029050602081019050919050565b600061116c6111678461112d565b610f41565b9050808382526020820190506020840283018581111561118f5761118e611047565b5b835b818110156111b857806111a48882610a66565b845260208401935050602081019050611191565b5050509392505050565b600082601f8301126111d7576111d6610f61565b5b81356111e7848260208601611159565b91505092915050565b60006112036111fe84611101565b610f41565b9050808382526020820190506020840283018581111561122657611225611047565b5b835b8181101561126d57803567ffffffffffffffff81111561124b5761124a610f61565b5b80860161125889826111c2565b85526020850194505050602081019050611228565b5050509392505050565b600082601f83011261128c5761128b610f61565b5b813561129c8482602086016111f0565b91505092915050565b600061012082840312156112bc576112bb610edc565b5b6112c7610120610f41565b9050600082013567ffffffffffffffff8111156112e7576112e6610f5c565b5b6112f384828501610fed565b600083015250602082013567ffffffffffffffff81111561131757611316610f5c565b5b611323848285016110d3565b602083015250604082013567ffffffffffffffff81111561134757611346610f5c565b5b61135384828501610fed565b604083015250606082013567ffffffffffffffff81111561137757611376610f5c565b5b61138384828501611277565b606083015250608061139784828501610a66565b60808301525060a06113ab84828501610a66565b60a08301525060c082013567ffffffffffffffff8111156113cf576113ce610f5c565b5b6113db848285016111c2565b60c08301525060e06113ef84828501610a9c565b60e08301525061010082013567ffffffffffffffff81111561141457611413610f5c565b5b61142084828501610fed565b6101008301525092915050565b60008060006060848603121561144657611445610a3b565b5b600061145486828701610a66565b935050602061146586828701610a9c565b925050604084013567ffffffffffffffff81111561148657611485610a40565b5b611492868287016112a5565b9150509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006114c78261149c565b9050919050565b6114d7816114bc565b82525050565b60006020820190506114f260008301846114ce565b92915050565b611501816114bc565b811461150c57600080fd5b50565b60008135905061151e816114f8565b92915050565b60006020828403121561153a57611539610a3b565b5b60006115488482850161150f565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061159857607f821691505b6020821081036115ab576115aa611551565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026116137fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826115d6565b61161d86836115d6565b95508019841693508086168417925050509392505050565b6000819050919050565b600061165a61165561165084610a45565b611635565b610a45565b9050919050565b6000819050919050565b6116748361163f565b61168861168082611661565b8484546115e3565b825550505050565b600090565b61169d611690565b6116a881848461166b565b505050565b5b818110156116cc576116c1600082611695565b6001810190506116ae565b5050565b601f821115611711576116e2816115b1565b6116eb846115c6565b810160208510156116fa578190505b61170e611706856115c6565b8301826116ad565b50505b505050565b600082821c905092915050565b600061173460001984600802611716565b1980831691505092915050565b600061174d8383611723565b9150826002028217905092915050565b61176682610af1565b67ffffffffffffffff81111561177f5761177e610ee1565b5b6117898254611580565b6117948282856116d0565b600060209050601f8311600181146117c757600084156117b5578287015190505b6117bf8582611741565b865550611827565b601f1984166117d5866115b1565b60005b828110156117fd578489015182556001820191506020850194506020810190506117d8565b8683101561181a5784890151611816601f891682611723565b8355505b6001600288020188555050505b505050505050565b61183881610a45565b82525050565b61184781610a7b565b82525050565b6000604082019050611862600083018561182f565b61186f602083018461183e565b939250505056fea26469706673582212206fbc07e988274d3dc898853f9e963d500861492de9459692fd39c4bcd72f41ac64736f6c63430008180033";

type ElectionResultsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ElectionResultsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ElectionResults__factory extends ContractFactory {
  constructor(...args: ElectionResultsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ElectionResults & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ElectionResults__factory {
    return super.connect(runner) as ElectionResults__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ElectionResultsInterface {
    return new Interface(_abi) as ElectionResultsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ElectionResults {
    return new Contract(address, _abi, runner) as unknown as ElectionResults;
  }
}
