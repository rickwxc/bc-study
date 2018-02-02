
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('greeting.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':greeter'].interface)

contact_instance = new web3.eth.Contract(abi, '0xC4320fdF9a8707dC036289CaF48ecbc8BEd984fF')// copy and past deployed contract address

contact_instance.methods.greet().call().then(console.log)
