let WorldJukeBox = artifacts.require('WorldJukeBox')

contract('WorldJukeBox', (accounts) =>{

	beforeEach(async function () {
    	this.jukebox = await WorldJukeBox.new();
  	})

	describe("Adding to queue", async function(){
		jukebox = await WorldJukeBox.new();
		jukebox.bidTrack('MyTrack', {value:web3.toWei(2,'ether')})
		jukebox.bidTrack('MyTrack2', {value:web3.toWei(.02,'ether')})
		test = await jukebox.test()
		console.log(test.toString(10))

	})

})