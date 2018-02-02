
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('greeting.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':greeter'].interface)

another_contract = new web3.eth.Contract(abi, '0x4b4EAd58e4574192870f5Dc1CAB39b4373722bE4')// copy and past deployed contract address

another_contract.methods.greet().call().then(console.log)
