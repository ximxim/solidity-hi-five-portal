// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HiFivePortal {
    uint256 totalHiFives;

    event NewHiFive(address indexed from, uint256 timestamp, string message);

    struct HiFive {
        address hiFiver;
        string message;
        uint256 timestamp;
    }

    HiFive[] hiFives;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function hiFive(string memory _message) public {
        totalHiFives += 1;
        console.log("%s sent a hi5!", msg.sender);

        hiFives.push(HiFive(msg.sender, _message, block.timestamp));
        emit NewHiFive(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");

        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllHiFives() public view returns (HiFive[] memory) {
        return hiFives;
    }

    function getTotalHiFives() public view returns (uint256) {
        console.log("We have %d total Hi Five's!", totalHiFives);
        return totalHiFives;
    }
}