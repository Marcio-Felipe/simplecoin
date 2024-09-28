//SPDX-License-Indentifier: MIT
pragma solidity ^0.8.0;

contract SimpleCoin{

    string public name = "intelligent";
    string public symbol = "BITC";
    uint public totalSupply = 10000;

    mapping(address => uint) public balanceOf;

    constructor(){
        balanceOf[msg.sender] = totalSupply;

    }

    function transfer(address _to, uint _amount) public {
        balanceOf[msg.sender] = balanceOf[msg.sender] - _amount;
        balanceOf[_to] = balanceOf[_to] + _amount;
    }
}