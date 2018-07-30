pragma solidity ^0.4.24;
import './Ownable.sol';
contract WorldJukebox is Ownable {

	uint public highestBid;
	bytes32 public currentTrack;
	address public highestBidder;
	uint public blockSet;

	event NewHighestBid(uint _bid, bytes32 _track, address _bidder);

	constructor(){
		blockSet = block.number;
	}
	function currentBid() public returns(uint){
		return (highestBid - highestBid*(block.number-blockSet)/20);
	}
	function bidTrack(bytes32 _track) payable{
		
		require(msg.value > (highestBid-(highestBid*(block.number-blockSet)/10)));

		//Test this for out of gas exception
		if(highestBid != 0 ){
			//Transfer funds back to previous highest _bidder
			highestBidder.transfer(highestBid);
			highestBid = 0;
		}

		highestBid = msg.value;
		currentTrack = _track;
		highestBidder = msg.sender;
		blockSet = block.number;
		emit NewHighestBid(highestBid, currentTrack, highestBidder);
	}

	function withdraw() onlyOwner {
		owner.transfer(this.balance);
	}

}
