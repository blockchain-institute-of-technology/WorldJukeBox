var WorldJukebox = artifacts.require("./WorldJukebox");

contract('WorldJukebox', function(accounts){


  beforeEach(async function () {
    this.jukeBox = await WorldJukebox.new();
  });

  describe('No current track set ', async function(){
  	//this.jukeBox = await WorldJukebox.new();
	
	it('should set current track and highest bid', async function(){
		_myBid = web3.toWei(1,'ether');
		_track = ('KidzBop1')
		await this.jukeBox.bidTrack(_track, {value:_myBid})
		bid = await this.jukeBox.highestBid()
		track = await this.jukeBox.currentTrack()
		assert.equal(_myBid, bid);
		assert.equal(_track, track.toString(_track.length));
	})
	it('should not set new track', async function(){

		_myBid = web3.toWei(1,'ether');
		_track = ('KidzBop1')
		await this.jukeBox.bidTrack(_track, {value:_myBid})
		bid = await this.jukeBox.highestBid()
		track = await this.jukeBox.currentTrack()
		
		//To add a few blocks to the chain to simulate real enviornment 
		web3.eth.sendTransaction({from:accounts[1],to:accounts[0],value:web3.toWei(1,'ether')})
		web3.eth.sendTransaction({from:accounts[2],to:accounts[0],value:web3.toWei(1,'ether')})
		web3.eth.sendTransaction({from:accounts[3],to:accounts[0],value:web3.toWei(1,'ether')})
		web3.eth.sendTransaction({from:accounts[4],to:accounts[0],value:web3.toWei(1,'ether')})
		//////////////////////////////////////////////////////////////////////////////

		_myBid = web3.toWei(.6,'ether');
		_track = ('KidzBop3')
		await this.jukeBox.bidTrack(_track, {value:_myBid})
		bid = await this.jukeBox.highestBid()
		track = await this.jukeBox.currentTrack()
		assert.equal(_myBid, bid);
		assert.equal(_track, track.toString(_track.length))

	})



  })
})