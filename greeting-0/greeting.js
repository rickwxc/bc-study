Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('greeting.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':greeter'].interface)


bytecode = complied.contracts[':greeter'].bytecode;

gasEstimate = web3.eth.estimateGas({data: bytecode})


var greeterContract = new web3.eth.Contract(abi)
var _greeting = "Hello World!"
cdeploy = greeterContract.deploy({data:bytecode, arguments:[_greeting]})


web3.eth.getAccounts().then(function (rs){
	accs = rs

	greeter = cdeploy.send(_greeting,{from:accs[0], gas: 1000000}, function(e, contract){
				console.log(contract);
				console.log(e);
		if(!e) {
			cnt = contract
			if(!contract.address) {
				console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

			} else {
				console.log("Contract mined! Address: " + contract.address);
				console.log(contract);
			}
		}else{
				console.log(contract);
				console.log(e);

		}
	})


})
// require('./greeting.js')
