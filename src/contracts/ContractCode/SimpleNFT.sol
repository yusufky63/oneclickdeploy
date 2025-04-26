// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleNFT {
    string public name;
    string public symbol;
    uint256 public maxSupply;
    uint256 public totalSupply;
    
    mapping(uint256 => address) public ownerOf;
    
    constructor(
        string memory _name, 
        string memory _symbol,
        uint256 _maxSupply, 
        address payable _feeReceiver,
        bool _feeRequired,
        uint256 _feeAmount
    ) payable {
        name = _name;
        symbol = _symbol;
        maxSupply = _maxSupply;
        totalSupply = 0;
        
        if (_feeRequired) {
            require(msg.value >= _feeAmount, "Fee amount too low");
            require(_feeReceiver != address(0), "Invalid fee receiver address");
            
            (bool success, ) = _feeReceiver.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
        
        // Auto mint one token to contract deployer
        mint();
    }
    
    function mint() public {
        require(totalSupply < maxSupply, "Max supply reached");
        totalSupply++;
        ownerOf[totalSupply] = msg.sender;
    }
}