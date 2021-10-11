// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HiFivePortal {
    uint256 totalHiFives;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function hiFive() public {
        totalHiFives += 1;
        console.log("%s sent a hi5!", msg.sender);
    }

    function getTotalHiFives() public view returns (uint256) {
        console.log("We have %d total Hi Five's!", totalHiFives);
        return totalHiFives;
    }
}