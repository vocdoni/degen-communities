// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {Upgrades, Options} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {CommunityHub} from "../src/CommunityHub.sol";
import {CommunityHubV2} from "../src/CommunityHubV2.sol";

contract CommunityHubUpgradeScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address proxy = vm.envAddress("COMMUNITY_HUB_CURRENT_ADDRESS"); // this is the proxy address

        vm.startBroadcast(deployerPrivateKey);

        Options memory opts;
        opts.referenceContract = "CommunityHub.sol";
        Upgrades.upgradeProxy(proxy, "CommunityHubV2.sol", "", opts);

        vm.stopBroadcast();
    }
}
