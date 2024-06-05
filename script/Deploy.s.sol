// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import "../src/CommunityHub.sol";

contract CommunityHubScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address proxy = Upgrades.deployUUPSProxy("CommunityHub.sol", abi.encodeCall(CommunityHub.initialize, ()));

        console.log("CommunityHub deployed at:", proxy);

        vm.stopBroadcast();
    }
}
