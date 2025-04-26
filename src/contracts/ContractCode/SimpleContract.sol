// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    constructor(address payable _feeReceiver, bool _feeRequired, uint256 _feeAmount) payable {
        if (_feeRequired) {
            require(msg.value >= _feeAmount, "Fee amount too low");
            require(_feeReceiver != address(0), "Invalid fee receiver address");
            
            (bool success, ) = _feeReceiver.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
    }
}