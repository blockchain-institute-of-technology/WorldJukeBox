var WorldJukebox = artifacts.require("./WorldJukebox");

contract('WorldJukebox', function(accounts){


  beforeEach(async function () {
    this.jukeBox = await WorldJukebox.new();
    this._myBid = web3.toWei(1,'ether');
	this._track = ('KidzBop1')
	await this.jukeBox.bidTrack(this._track, {value:this._myBid})
  });

	describe('No current track set ', async function(){
  	//this.jukeBox = await WorldJukebox.new();
	
		it('should set current track and highest bid', async function(){
			bid = await this.jukeBox.highestBid()
			track = await this.jukeBox.currentTrack()
			assert.equal(this._myBid, bid);
			assert.equal(this._track, hex2a(track));
		})
	})
	describe('The current track is set', function(){
		it('should set new track when bid is greater than current bid', async function(){
			//To add a few blocks to the chain to simulate real enviornment 
			web3.eth.sendTransaction({from:accounts[1],to:accounts[0],value:web3.toWei(1,'ether')})
			web3.eth.sendTransaction({from:accounts[2],to:accounts[0],value:web3.toWei(1,'ether')})
			web3.eth.sendTransaction({from:accounts[3],to:accounts[0],value:web3.toWei(1,'ether')})
			web3.eth.sendTransaction({from:accounts[4],to:accounts[0],value:web3.toWei(1,'ether')})
			//////////////////////////////////////////////////////////////////////////////
			newbid = web3.toWei(.6,'ether');
			_track = ('KidzBop3')
			await this.jukeBox.bidTrack(_track, {value:newbid})
			bid = await this.jukeBox.highestBid()
			track = await this.jukeBox.currentTrack()
			assert.equal(newbid, bid);
			assert.equal(_track, hex2a(track))
		})
		it('should not set new track when bid is lower than current bid', async function(){
			newbid = web3.toWei(.6,'ether');
			_track = ('KidzBop3')
			try{
            	await this.jukeBox.bidTrack(_track, {value:newbid})
            	assert.fail('Expected revert not received');
          	}
          	catch(error){
            	const revertFound = error.message.search('revert') >= 0;
            	assert(revertFound, `Expected "revert", got ${error} instead`);
         	 }
			track = await this.jukeBox.currentTrack()
			assert.equal(this._track, hex2a(track))

		})
		it('should decrease current bid by 10% every block', async function(){
			web3.eth.sendTransaction({from:accounts[1],to:accounts[0],value:web3.toWei(1,'ether')})
			bid = await this.jukeBox.highestBid()
			console.log(bid)
			expected = web3.toWei(.9,'ether');
			assert.equal(bid, expected)
		})

	})
})

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 2; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}