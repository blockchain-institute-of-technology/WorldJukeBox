pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract WorldJukebox is Ownable {

	string public currentTrack;
	uint public currentBid;
	address public highestBidder;
	uint public blockNumber;
	uint public test;

	event NewTrack( string currentTrack, uint currentBid, uint blockNumber);

	constructor(){

	}	 

	function bidTrack(string _newTrack) payable{
		uint newBlockNumber = block.number;
		uint test = (newBlockNumber-blockNumber)/10*currentBid;
		require(msg.value > test);

		currentTrack = _newTrack;
		blockNumber = newBlockNumber;
		highestBidder = msg.sender;
		currentBid = msg.value;
	}
}

