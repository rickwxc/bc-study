Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const fs = require('fs')
solc = require('solc')

input = fs.readFileSync('addsub.sol', 'utf8')
complied = solc.compile(input);
abi = JSON.parse(complied.contracts[':Addsub'].interface)


bytecode = complied.contracts[':Addsub'].bytecode;

contact_instance = new web3.eth.Contract(abi, '0x522372D72Af0eFf9B05aD574FDeec787e6F634B7')// copy and past deployed contract address

web3.eth.getAccounts().then(function (rs){
	accs = rs

	contact_instance.methods.add().send({from:accs[1]}).then(function(rs){
		console.log('after add:')
		contact_instance.methods.getCounter().call().then(console.log)

		web3.eth.getBalance(accs[1]).then(function(b){
			console.log(web3.utils.fromWei(b, 'ether'))
		})
	})

})
