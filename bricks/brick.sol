pragma solidity ^0.4.0;

/*
Currency that can only be issued by its creator and transferred to anyone
*/
contract Brick {
    address public creator;
    mapping (address => uint) public balances;
    uint public PRICE = 3; //3 wei

    // event that notifies when a transfer has completed
    event Delivered(address from, address to, uint amount);

    function Brick() {
        creator = msg.sender;
    }   

    function create() payable {
        require(msg.value > 0 && msg.value % PRICE == 0); 
        balances[msg.sender] += (msg.value / PRICE);
    }

    function transfer(address receiver, uint amount) {
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Delivered(msg.sender, receiver, amount);
    }   
}

