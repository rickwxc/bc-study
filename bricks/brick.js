Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('brick.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':Brick'].interface)

bytecode = complied.contracts[':Brick'].bytecode;
gasEstimate = web3.eth.estimateGas({data: bytecode}).then(console.log)

web3.eth.getAccounts().then(function (rs){
	accs = rs

	cdeploy = new web3.eth.Contract(abi, {from: accs[0]}).deploy({data:bytecode})

	cdeploy.send({from:accs[0], gas: 1000000}).then(function(contract){
		gt = contract // gt can be used in cmd of node
		console.log("Contract Address: " + contract.options.address);

	})

})
