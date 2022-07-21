import React, { Component } from 'react';
import logo from '../logo.png';
import print from '../raybangs-miami.jpg'
import NFT from '../abis/nftcontract.json';
import MyNFT from '../abis/mynft.json';
import './App.css';

//Application Specific components
import {getAccountData} from '../helpers';
import Navbar from './NavBar';
import Main from './Main'
import Web3 from 'web3';

//Contract ABI files should go here

class App extends Component { 

  async componentWillMount () {
    await this.loadWeb3();
    await this.loadBlockChainData() 
  }

// cooper s - load blockchain data here 
// Web3 for now but may adopt graphQL later  
async loadWeb3 () {
  console.log("loadWeb3");
  if (window.ethereum) {
    console.log("loadWeb3: ethereum window");
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable();
  } else if (window.web3) {
    console.log("loadWeb3: web3 window");
    window.web3 = new  Web3(window.web3.currentProvider)
  }//end iffy
  else {
    window.alert('Non-Ethereum browser detected! Please connect to MetaMask')
  }//end iffy else

}//end loadWeb3
async loadBlockChainData() {
  console.log("loadBlockChainData");

  const web3 = window.web3;

  //cooper s - get  all the account data at once....
  const accountData = await getAccountData(web3)
  //console.log("accountData: ", accountData );

  this.setState({account: accountData.account });
  this.setState({accountName: accountData.accountName});
  this.setState ({balance: window.web3.utils.fromWei(accountData.accountBalance)})

  
  // create js version of TestContract

  const contractAddr = 0xC4BC3551c6C7dDc1177F3b4353BfcC5184DbA282; //"0x01d3dFe1a2CecE683a5DA384b044Cffb58965488";


//  const nftAddr = "0xdEc9218A28d549F9f02448C9607082422ae6e737";
const nftAddr = "0xC4BC3551c6C7dDc1177F3b4353BfcC5184DbA282";

  let networkId = accountData.networkInfo.id;
  this.setState ({networkId: accountData.networkInfo.network} );

if (networkId) {
  //console.log("Network is available")
  //const contract = new web3.eth.Contract(contractABI, contractAddr )
  const contract = new web3.eth.Contract(MyNFT.abi, nftAddr);
  console.log("Test Contract: ", contract._baseURI() )
  this.setState({contract});
  // contract name and address
    this.setState({contractAddr: contract.address});
    //let message = await contract.methods.executeOperation().call;
    let message = "Patent Pending";
   // console.log("TestContract - Am I the owner: ", message );
    this.setState({contractName: message});
  } else {
    window.alert("Smart contract not available on network: " + this.state.networkId )
  }
  this.setState({loading: false })

    
}//end loadBlockChainData 
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      accountName: ''
,     balance: '0',
      token: {},
      tokenBalance: '0',
      ethSwap:{},
      networkId:'',
      contract: {},
      contractName: "Null",
      contractAddr:"Null",
      loading: true
    }//end state
  }//end constructor


  render() {
    let content;
    if (this.state.loading){
      content = <p id="loader" className="text-center">Loading...</p>
    } else {

    }


    const mint = (print) => {
      console.log("Mint some coin buddy: " , print, " from: ", this.state.account );

      const testMint = "0xFD5D8ae0d003f81cc20971C7d37e806bbaBD50C2" //"0x42977ca2fC4d2E3372a01213c0b8955702E1A3af"; // 
      
      
      const url = this.state.contract.methods._baseURI().call();
      console.log("final url: ", url );
      
      //this.state.contract.methods.mint(testMint).send({ from: this.state.account })
      this.state.contract.methods.mint(this.state.account, "94358309").send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log("here's your receipt: ", receipt);
        alert("here's your receipt: "+ receipt)
      })  


    }//end mint
    return (
      <div>
        <Navbar account={this.state.accountName} network={this.state.networkId} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <br/><br/>
              <div className="content mr-auto ml-auto">
                <div></div>
                <br/><br/>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={print} className="App-logo" alt="logo" width="300" height="250"/>
                </a>
                <br/><br/>
                <h1>Mint My NFT</h1>
 
                <form onSubmit={(event) => {
                      event.preventDefault()
                      const print = "My Work"
                      console.log("mint me baby!!")
                      mint(print)
                    }}>
                      <div><label > Price: 1 ETH</label></div>
                      <input
                        type='submit'
                        className='btn btn-block btn-primary'
                        value='MINT'
                      />
                  </form>
                <div className ="text-left">
                  <b>Network:</b> {this.state.networkId}
                  <br/>
                  <b>Account:</b> {this.state.accountName} 
                  <br/>
                  <b>Account Balance:</b> {this.state.balance }  ETH
                  <br/>
                  <b>Contract Name:</b> {this.state.contractName }
                  <br/>
                  <b>Contract Address:</b> {this.state.contractAddr }
                  <br/>
                </div> 
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
