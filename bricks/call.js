Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('brick.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':Brick'].interface)
bytecode = complied.contracts[':Brick'].bytecode;

contact_instance = new web3.eth.Contract(abi, '0x5815b7876811631F9DDEF6b10c3a355cCce17125')// copy and past deployed contract address

web3.eth.getAccounts().then(function (rs){
	accs = rs

	contact_instance.methods.balances(accs[1]).call().then(console.log)

	// buy bricks
	contact_instance.methods.create().send({from:accs[1], value:6}).then(function(rs){
		console.log('after create:')
		contact_instance.methods.balances(accs[1]).call().then(console.log)

		web3.eth.getBalance(accs[1]).then(function(b){
			console.log(web3.utils.fromWei(b, 'ether'))
		})

		//doing transfer
		contact_instance.methods.transfer(accs[0], 1).send({from:accs[1]}).then(function(rs){
			console.log('after transfer:')
			contact_instance.methods.balances(accs[0]).call().then(console.log)
			contact_instance.methods.balances(accs[1]).call().then(console.log)
		})

	})

})

