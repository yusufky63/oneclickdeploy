// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balances;
    
    constructor(
        string memory _name, 
        string memory _symbol, 
        uint256 _initialSupply, 
        address payable _feeReceiver, 
        bool _feeRequired, 
        uint256 _feeAmount
    ) payable {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply * 10**decimals;
        balances[msg.sender] = totalSupply;
        
        if (_feeRequired) {
            require(msg.value >= _feeAmount, "Fee amount too low");
            require(_feeReceiver != address(0), "Invalid fee receiver address");
            
            (bool success, ) = _feeReceiver.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
    }
}