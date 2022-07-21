import React, { Component } from 'react'
//import BuyForm from './BuyForm'
//import SellForm from './SellForm'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy',
      account: '0x00c3e8976ae622C79C6e33749eF999aa9ECba3c1',
      contract: ""
    }
  }

  render() {
    
    let content


    const mint = (print) => {
      console.log("Mint some coin buddy: " , print, " from: ", this.state.account )


  
      this.state.contract.methods.mint(print).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log("here's your receipt...");
        this.setState({
          colors: [...this.state.colors, print]
        })
      }) 
    }


    return (
      <div id="content" className="mt-3">

        <div className="d-flex justify-content-between mb-3">
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
        </div>

        <div className="card mb-4" >

          <div className="card-body">
          </div>

        </div>

      </div>
    );
  }
}

export default Main;
