Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('greeting.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':greeter'].interface)


bytecode = complied.contracts[':greeter'].bytecode;

gasEstimate = web3.eth.estimateGas({data: bytecode})


greeterContract = new web3.eth.Contract(abi)
_greeting = "Hello World!"
cdeploy = greeterContract.deploy({data:bytecode, arguments:[_greeting]})


web3.eth.getAccounts().then(function (rs){
	accs = rs

	cdeploy.send({from:accs[0], gas: 1000000}).then(function(contract){
		gt = contract // gt can be used in cmd of node

		console.log("Contract mined! Address: " + contract._address);
		console.log(" =========== ");
		gt.methods.greet().call().then(console.log)
	})


})
// run in side node cmd line like this:

// node 
// > require('./greeting.js')
// > gt
