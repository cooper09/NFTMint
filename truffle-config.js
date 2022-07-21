require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    ropsten:{
      provider: function(){
        //cooper s - create ropsten wallet for Account: Primary
        return new HDWalletProvider(process.env.PRIVATE_KEY, "https://kovan.infura.io/v3/"+process.env.API_KEY)
      },
      gasPrice: 250000,
      gas: 3000000,
      network_id:'3'
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
