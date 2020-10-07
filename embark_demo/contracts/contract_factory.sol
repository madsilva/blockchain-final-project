pragma solidity ^0.5.0;

import "user_contract.sol";

contract ContractFactory {
  // the business that wants to pay affiliates
  address payable public owner;
  mapping (address => address) accounts;
  mapping (uint => address) ids;
  uint numberAccounts;

  constructor() public {
    owner = msg.sender;
    numberAccounts = 0;
  }

  // call from business account
  function register(address payable addr, string memory name) public {
    require(accounts[addr] == address(0x0), "account already exists"); //We check if the user is already registered
    ids[numberAccounts] = addr;
    accounts[addr] = address(new UserContract(addr, name));
    numberAccounts++;
  }

  function getAccount(address adr) public returns (address account) {
    return (accounts[adr]);
  }

  function getAccountId(uint id) public returns (address account) {
    return (accounts[ids[id]]);
  }
 
  function getNbAccounts() public returns (uint nb) {
    return (numberAccounts);
  }
}