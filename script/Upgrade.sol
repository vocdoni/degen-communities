// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import "../src/CommunityHub.sol";

contract CommunityHubScript is Script {
    function run() external {
        address communityHubV1 = vm.envAddress("COMMUNITY_HUB_CURRENT_ADDRESS");

        vm.startBroadcast();

        CommunityHub newImplementation = new CommunityHub();
        UUPSUpgradeable(communityHubV1).upgradeTo(address(newImplementation));

        console.log("CommunityHub upgraded to:", address(newImplementation));

        vm.stopBroadcast();
    }
}
