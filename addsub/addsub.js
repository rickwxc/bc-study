Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('addsub.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':Addsub'].interface)


bytecode = complied.contracts[':Addsub'].bytecode;
gasEstimate = web3.eth.estimateGas({data: bytecode}).then(console.log)

web3.eth.getAccounts().then(function (rs){
	accs = rs

	addsubContract = new web3.eth.Contract(abi, {from: accs[0]})
	cdeploy = addsubContract.deploy({data:bytecode})

	cdeploy.send({from:accs[0], gas: 215314}).then(function(contract){
		gt = contract // gt can be used in cmd of node

		console.log("Contract Address: " + contract.options.address);
		console.log(" =========== ");
		contract.methods.getCounter().call().then(console.log)

		contract.methods.add().send().then(function(rs){
			console.log('after add:')
			contract.methods.getCounter().call().then(console.log)
		})

	})


})
