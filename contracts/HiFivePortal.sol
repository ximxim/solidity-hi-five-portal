// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HiFivePortal {
    uint256 totalHiFives;
    uint256 private seed;

    event NewHiFive(address indexed from, uint256 timestamp, string message);

    struct HiFive {
        address hiFiver;
        string message;
        uint256 timestamp;
    }

    HiFive[] hiFives;

    mapping(address => uint256) public lastHiFivedAt;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function hiFive(string memory _message) public {
        require(
            lastHiFivedAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30 seconds"
        );

        lastHiFivedAt[msg.sender] = block.timestamp;

        totalHiFives += 1;
        console.log("%s sent a hi5!", msg.sender);

        hiFives.push(HiFive(msg.sender, _message, block.timestamp));

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;
        console.log("Random # generate: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50) {
            console.log("%s won", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewHiFive(msg.sender, block.timestamp, _message);
    }

    function getAllHiFives() public view returns (HiFive[] memory) {
        return hiFives;
    }

    function getTotalHiFives() public view returns (uint256) {
        console.log("We have %d total Hi Five's!", totalHiFives);
        return totalHiFives;
    }
}
