pragma solidity ^0.4.16;

contract Addsub {

	uint256 counter = 5; //state variable we assigned earlier
	address owner = msg.sender; //set owner as msg.sender

    function Addsub() {
    }

	function add() public {  //increases counter by 1
		counter++;
	}

	function sub() public { //decreases counter by 1
		counter--;
	}

	function getCounter() public constant returns (uint256) {
		return counter;
	} 

	function kill() public { //self-destruct function, 
		if(msg.sender == owner) {
			selfdestruct(owner); 
		}
	}

}
