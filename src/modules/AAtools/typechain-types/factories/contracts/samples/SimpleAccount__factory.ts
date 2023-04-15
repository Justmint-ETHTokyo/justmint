/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  SimpleAccount,
  SimpleAccountInterface,
} from "../../../contracts/samples/SimpleAccount";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEntryPoint",
        name: "anEntryPoint",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IEntryPoint",
        name: "entryPoint",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "SimpleAccountInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "addDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "entryPoint",
    outputs: [
      {
        internalType: "contract IEntryPoint",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dest",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "func",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "dest",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "func",
        type: "bytes[]",
      },
    ],
    name: "executeBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeposit",
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
        internalType: "address",
        name: "anOwner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nonce",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
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
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "tokensReceived",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "missingAccountFunds",
        type: "uint256",
      },
    ],
    name: "validateUserOp",
    outputs: [
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawDepositTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60c0346200016157601f620022b538819003918201601f19168301916001600160401b0383118484101762000166578084926020946040528339810103126200016157516001600160a01b038116810362000161573060805260a05260005460ff8160081c166200010c5760ff80821610620000d0575b60405161213890816200017d82396080518181816105c601528181610ce60152610ec3015260a0518181816107e8015281816109b801528181610aa10152818161106f0152818161126601528181611c450152611ca30152f35b60ff90811916176000557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160ff8152a13862000076565b60405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b6064820152608490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604052600436101561001b575b361561001957600080fd5b005b60003560e01c806223de291461018257806301ffc9a714610179578063150b7a021461017057806318dfb3c7146101675780633659cfe61461015e5780633a871cdd146101555780634a58db191461014c5780634d44560d146101435780634f1ef2861461013a57806352d1902d146101315780638da5cb5b14610128578063affed0e01461011f578063b0d691fe14610116578063b61d27f61461010d578063bc197c8114610104578063c399ec88146100fb578063c4d66de8146100f25763f23a6e610361000e576100ed61144d565b61000e565b506100ed6112e9565b506100ed6111ec565b506100ed611124565b506100ed611093565b506100ed611023565b506100ed610fd8565b506100ed610f98565b506100ed610e7c565b506100ed610c64565b506100ed610a42565b506100ed610975565b506100ed61077d565b506100ed610571565b506100ed61041c565b506100ed610359565b506100ed610268565b506100ed6101dc565b73ffffffffffffffffffffffffffffffffffffffff8116036101a957565b600080fd5b9181601f840112156101a95782359167ffffffffffffffff83116101a957602083818601950101116101a957565b50346101a95760c07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a95761021760043561018b565b61022260243561018b565b61022d60443561018b565b67ffffffffffffffff6084358181116101a95761024e9036906004016101ae565b505060a4359081116101a9576100199036906004016101ae565b50346101a95760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a9576004357fffffffff0000000000000000000000000000000000000000000000000000000081168091036101a957807f150b7a02000000000000000000000000000000000000000000000000000000006020921490811561032f575b8115610305575b506040519015158152f35b7f01ffc9a700000000000000000000000000000000000000000000000000000000915014386102fa565b7f4e2312e000000000000000000000000000000000000000000000000000000000811491506102f3565b50346101a95760807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a95761039460043561018b565b61039f60243561018b565b60643567ffffffffffffffff81116101a9576103bf9036906004016101ae565b505060206040517f150b7a02000000000000000000000000000000000000000000000000000000008152f35b9181601f840112156101a95782359167ffffffffffffffff83116101a9576020808501948460051b0101116101a957565b50346101a95760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a95767ffffffffffffffff6004358181116101a95761046d9036906004016103eb565b90916024359081116101a9576104879036906004016103eb565b9190610491611c8c565b8282036105135760005b8281106104a457005b806104d86104bd6104b8600194878a611b11565b611b2f565b6104d26104cb848988611b39565b3691610c2d565b90612065565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610506575b0161049b565b61050e611ab1565b610500565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f77726f6e67206172726179206c656e67746873000000000000000000000000006044820152fd5b50346101a95760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a9576004356105ad8161018b565b73ffffffffffffffffffffffffffffffffffffffff90817f000000000000000000000000000000000000000000000000000000000000000016916105f3833014156114df565b6106227f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc93828554161461156a565b61062a612085565b6040519061063782610b6b565b600082527f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610671575050610019915061169c565b6020600491604094939451928380927f52d1902d00000000000000000000000000000000000000000000000000000000825286165afa6000918161074d575b5061073a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608490fd5b610019936107489114611611565b611788565b61076f91925060203d8111610776575b6107678183610ba3565b8101906115f5565b90386106b0565b503d61075d565b50346101a9577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc6060813601126101a95760043567ffffffffffffffff81116101a957610160816004019282360301126101a95773ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001633036109175761082861081d60243584611d3f565b926044830190611a26565b905015610853575b61084f8261083f604435611a77565b6040519081529081906020820190565b0390f35b6024600154916bffffffffffffffffffffffff927fffffffffffffffffffffffffffffffffffffffff0000000000000000000000008482169480861461090a575b60018601169116176001550135036108ac5738610830565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f6163636f756e743a20696e76616c6964206e6f6e6365000000000000000000006044820152fd5b610912611ab1565b610894565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f6163636f756e743a206e6f742066726f6d20456e747279506f696e74000000006044820152fd5b506000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610a3f5773ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001681813b15610a3f57602491604051928380927fb760faf900000000000000000000000000000000000000000000000000000000825230600483015234905af18015610a32575b610a26575080f35b610a2f90610b4a565b80f35b610a3a611604565b610a1e565b80fd5b50346101a957600060407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610a3f57600435610a808161018b565b610a88612085565b8173ffffffffffffffffffffffffffffffffffffffff807f00000000000000000000000000000000000000000000000000000000000000001692833b15610b16576044908360405195869485937f205c287800000000000000000000000000000000000000000000000000000000855216600484015260243560248401525af18015610a3257610a26575080f35b8280fd5b507f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b67ffffffffffffffff8111610b5e57604052565b610b66610b1a565b604052565b6020810190811067ffffffffffffffff821117610b5e57604052565b6060810190811067ffffffffffffffff821117610b5e57604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117610b5e57604052565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f60209267ffffffffffffffff8111610c20575b01160190565b610c28610b1a565b610c1a565b929192610c3982610be4565b91610c476040519384610ba3565b8294818452818301116101a9578281602093846000960137010152565b5060407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a957600435610c9b8161018b565b60243567ffffffffffffffff81116101a957366023820112156101a957610ccc903690602481600401359101610c2d565b9073ffffffffffffffffffffffffffffffffffffffff91827f00000000000000000000000000000000000000000000000000000000000000001692610d13843014156114df565b610d427f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc94828654161461156a565b610d4a612085565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610d80575050610019915061169c565b6020600491604094939451928380927f52d1902d00000000000000000000000000000000000000000000000000000000825286165afa60009181610e5c575b50610e49576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608490fd5b61001993610e579114611611565b611867565b610e7591925060203d8111610776576107678183610ba3565b9038610dbf565b50346101a95760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a95773ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610f14576040517f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8152602090f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152fd5b50346101a95760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a957602060015460601c604051908152f35b50346101a95760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a95760206bffffffffffffffffffffffff60015416604051908152f35b50346101a95760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a957602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b50346101a95760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a9576004356110cf8161018b565b60443567ffffffffffffffff81116101a9576000916110fe6110f6849336906004016101ae565b6104cb611c8c565b9060208251920190602435905af16111146118c7565b901561111c57005b602081519101fd5b50346101a95760a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a95761115f60043561018b565b61116a60243561018b565b67ffffffffffffffff6044358181116101a95761118b9036906004016103eb565b50506064358181116101a9576111a59036906004016103eb565b50506084359081116101a9576111bf9036906004016101ae565b50506040517fbc197c81000000000000000000000000000000000000000000000000000000008152602090f35b50346101a9576000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610a3f576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260208160248173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa9081156112dc575b82916112a2575b604051828152602090f35b90506020813d82116112d4575b816112bc60209383610ba3565b810103126112d05761084f91505138611297565b5080fd5b3d91506112af565b6112e4611604565b611290565b50346101a95760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a9576004356113258161018b565b6113876000549161134d60ff8460081c16158094819561143f575b811561141f575b50611b63565b8261137e60017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff006000541617600055565b6113e957611bee565b61138d57005b6113ba7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff60005416600055565b604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602090a1005b61141a6101007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff6000541617600055565b611bee565b303b15915081611431575b5038611347565b6001915060ff16143861142a565b600160ff8216109150611340565b50346101a95760a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101a95761148860043561018b565b61149360243561018b565b60843567ffffffffffffffff81116101a9576114b39036906004016101ae565b505060206040517ff23a6e61000000000000000000000000000000000000000000000000000000008152f35b156114e657565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c00000000000000000000000000000000000000006064820152fd5b1561157157565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f787900000000000000000000000000000000000000006064820152fd5b908160209103126101a9575190565b506040513d6000823e3d90fd5b1561161857565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152fd5b803b156117045773ffffffffffffffffffffffffffffffffffffffff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc91167fffffffffffffffffffffffff0000000000000000000000000000000000000000825416179055565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e7472616374000000000000000000000000000000000000006064820152fd5b906117928261169c565b73ffffffffffffffffffffffffffffffffffffffff82167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a280511580159061185f575b6117e1575050565b61185c91600080604051936117f585610b87565b602785527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c60208601527f206661696c6564000000000000000000000000000000000000000000000000006040860152602081519101845af46118566118c7565b9161195c565b50565b5060006117d9565b906118718261169c565b73ffffffffffffffffffffffffffffffffffffffff82167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600080a28051158015906118bf576117e1575050565b5060016117d9565b3d156118f2573d906118d882610be4565b916118e66040519384610ba3565b82523d6000602084013e565b606090565b156118fe57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152fd5b9192901561197f5750815115611970575090565b61197c903b15156118f7565b90565b8251909150156119925750805190602001fd5b604051907f08c379a000000000000000000000000000000000000000000000000000000000825281602080600483015282519283602484015260005b848110611a0f575050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f836000604480968601015201168101030190fd5b8181018301518682016044015285935082016119ce565b9035907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1813603018212156101a9570180359067ffffffffffffffff82116101a9576020019181360383136101a957565b80611a7f5750565b600080808093337ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff15061185c6118c7565b507f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b507f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9190811015611b22575b60051b0190565b611b2a611ae1565b611b1b565b3561197c8161018b565b9091611b5292811015611b56575b60051b810190611a26565b9091565b611b5e611ae1565b611b47565b15611b6a57565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152fd5b6bffffffffffffffffffffffff7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000006001549260601b169116178060015560601c73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000167f47e55c76e7a6f1fd8996a1da8008c1ea29699cca35e7bcd057f2dec313b6e5de600080a3565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001633148015611d31575b15611cd357565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f6163636f756e743a206e6f74204f776e6572206f7220456e747279506f696e746044820152fd5b5060015460601c3314611ccc565b90611dc2611dba73ffffffffffffffffffffffffffffffffffffffff9260405160208101917f19457468657265756d205369676e6564204d6573736167653a0a3332000000008352603c820152603c8152611d9981610b87565b519020611db46104cb60015460601c96610140810190611a26565b90611f94565b919091611e0b565b1603611dcd57600090565b600190565b60051115611ddc57565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b611e1481611dd2565b80611e1c5750565b611e2581611dd2565b60018103611e8c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606490fd5b611e9581611dd2565b60028103611efc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606490fd5b80611f08600392611dd2565b14611f0f57565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608490fd5b906041815114600014611fbe57611b52916020820151906060604084015193015160001a90611fc8565b5050600090600290565b9291907f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083116120595791608094939160ff602094604051948552168484015260408301526060820152600093849182805260015afa1561204c575b815173ffffffffffffffffffffffffffffffffffffffff811615612046579190565b50600190565b612054611604565b612024565b50505050600090600390565b600091829182602083519301915af161207c6118c7565b901561111c5750565b60015460601c331480156120f9575b1561209b57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f6f6e6c79206f776e6572000000000000000000000000000000000000000000006044820152fd5b5030331461209456fea26469706673582212206994f5528cc58fc351b42e8358a2f6ab364ec1a4f70947280a103bd622a711a064736f6c63430008110033";

type SimpleAccountConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SimpleAccountConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SimpleAccount__factory extends ContractFactory {
  constructor(...args: SimpleAccountConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    anEntryPoint: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SimpleAccount> {
    return super.deploy(
      anEntryPoint,
      overrides || {}
    ) as Promise<SimpleAccount>;
  }
  override getDeployTransaction(
    anEntryPoint: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(anEntryPoint, overrides || {});
  }
  override attach(address: string): SimpleAccount {
    return super.attach(address) as SimpleAccount;
  }
  override connect(signer: Signer): SimpleAccount__factory {
    return super.connect(signer) as SimpleAccount__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleAccountInterface {
    return new utils.Interface(_abi) as SimpleAccountInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleAccount {
    return new Contract(address, _abi, signerOrProvider) as SimpleAccount;
  }
}