pragma solidity ^0.5.0;

contract UserContract {
  // the business who pays the affiliate
  address payable public owner;
  // the affiliate
  address payable public recipient;
  string public recipientName;

  function() external payable { }

  // The sender of the contract must be the business account
  constructor(address payable r, string memory name) public {
    owner = msg.sender;
    recipient = r;
    recipientName = name;
  }

  function getName() public returns (string memory name) {
    return recipientName;
  }
}