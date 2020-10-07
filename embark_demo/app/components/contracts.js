import EmbarkJS from 'Embark/EmbarkJS';
import SimpleStorage from '../../embarkArtifacts/contracts/SimpleStorage';
import UserContract from '../../embarkArtifacts/contracts/UserContract';
import ContractFactory from '../../embarkArtifacts/contracts/ContractFactory';
import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

class Contracts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userAddress: "",
      username: "",
      contractAddress: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState = this.setState.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log("aaaa");
    event.preventDefault();
    this.makeContract(event);
  }

  makeContract(event) {
    ContractFactory.methods.register(this.state.userAddress, this.state.username).send({gas: 8000000})
    .on('transactionHash', function(hash) {
      //this.setState({contractAddress: "tx submitted"});
      console.log("hash: " + hash);
    }).on('confirmation', function(confirmationNumber, receipt) {
      console.log("confirmation #: " + confirmationNumber + " receipt: ");
      console.log(receipt);
    }).on ('receipt', function(receipt) {
      //this.setState({contractAddress: "receipt available!"});
      console.log("receipt: ");
      console.log(receipt);
    }).on('error', function(error, receipt) {
      //this.setState({contractAddress: "error!"});
      console.log("error: " + error + " receipt: ");
      console.log(receipt);
    });
    
    //this.setState({contractAddress: });
  }
  
  render() {
    return (
      <React.Fragment>
        <h1>Sign up to be an affiliate</h1>
        <Form  onSubmit={this.handleSubmit}>
          <FormGroup>
            name: {this.state.username}
            <FormText>Ethereum account address</FormText>
            <Input name="userAddress" type="text" defaultValue={this.state.userAddress} onChange={this.handleInputChange}/>
            <FormText>Name to associate with account</FormText>
            <Input name="username" type="text" defaultValue={this.state.username} onChange={this.handleInputChange}/>
            <Button type="submit" color="primary">Make contract</Button>
          </FormGroup>
        </Form>
      <p>Contract account address: {this.state.contractAddress}</p>
      </React.Fragment>
    );
  }
}


export default Contracts;