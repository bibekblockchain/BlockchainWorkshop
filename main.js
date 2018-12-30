let SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index,timestamp,data,previousHash){
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;
		
		this.hash = '';

		this.nonce=0;
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;

			this.hash = this.calculateHash();
		}
	}
}
 
class Blockchain{
	constructor(){
		this.chain=[this.createGenesisBlock()];
		this.difficulty = 5;
	}
	
	createGenesisBlock(){
		return new Block(0,null,"29-12-2018","0");	
	}

	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}

	addBlock(newBlock){
		newBlock.previousHash =this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		//newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isValid(){
		for(let i=1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}
		
			return true;
	}
}

let bibekCoin = new Blockchain();

bibekCoin.addBlock(new Block(1,"29-12-2018",{Ram:50}));

console.log('Block 1 mined.....');

bibekCoin.addBlock(new Block(2,"29-12-2018",{Shyam:30}));

console.log('Block 2 mined.....');

bibekCoin.addBlock(new Block(3,"29-12-2018",{Hari:100}));

console.log('Block 3 mined.....');

console.log('Is BlockChain valid?'+ bibekCoin.isValid());

console.log(bibekCoin);



