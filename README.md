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
```

- Base sepolia

```shell
forge script --chain-id 84532 script/Deploy.s.sol:CommunityHubDeployScript --rpc-url ${BASE_SEPOLIA_RPC_URL} --broadcast --verify --verifier-url ${BASESCAN_SEPOLIA_URL} --etherscan-api-key ${BASESCAN_SEPOLIA_API_KEY} -- --vvvv
```

- Base

```shell
forge script --chain-id 8453 script/Deploy.s.sol:CommunityHubDeployScript --rpc-url ${BASE_RPC_URL} --broadcast --slow --verify --verifier-url ${BASESCAN_URL} --etherscan-api-key ${BASESCAN_API_KEY} --optimize --optimizer-runs 20000 -- --vvvv
```

**For production deployments do not use a public RPC. Use a dedicated one or things like the node mempool can cause the script to fail.**

### Deploying locally using anvil

```shell
$ anvil
```

- Update your .env file with a private key given to you by Anvil.

```shell
forge script script/Deploy.s.sol:MyScript --fork-url http://localhost:8545 --broadcast
```

### Verify

forge verify-contract --chain-id 8453 --num-of-optimizations 20000 --watch --verifier-url ${BASESCAN_URL} --etherscan-api-key ${BASESCAN_API_KEY} --compiler-version v0.8.25+commit.b61c2a9 <contractAddress> src/<contractName>.sol:<contractName>

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

### Hardhat migration script

```shell
npx hardhat --network base run ./script/migratev2.ts
```
