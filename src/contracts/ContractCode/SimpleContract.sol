// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    constructor(address payable _feeReceiver, bool _feeRequired, uint256 _feeAmount) payable {
        // Eğer ücret gerekliyse
        if (_feeRequired) {
            require(msg.value >= _feeAmount, "Fee amount too low");
            require(_feeReceiver != address(0), "Invalid fee receiver address");
            
            // Ücreti gönder (call ile)
            (bool success, ) = _feeReceiver.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
    }
}