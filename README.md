**DISCLAIMER: THIS IS A POC UNDER DEVELOPMENT, DO NOT USE IT IN PRODUCTION ENVIRONMENTS**

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ source .env
$ forge script --chain base script/CommunityHub.s.sol:CommunityHubScript --rpc-url $BASE_RPC_URL --broadcast --verify --vvvv
```

### Deploying locally using anvil

```shell
$ anvil
```

- Update your .env file with a private key given to you by Anvil.

```shell
forge script script/CommunityHub.s.sol:MyScript --fork-url http://localhost:8545 --broadcast
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
