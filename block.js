const bcrypt = require("bcrypt");

class Block {
  constructor(blockid, previousHash, data) {
    this.blockid = blockid;
    this.timestamp = Date.now();
    this.blockhash = this.getHash();
    this.prevHash = previousHash;
    this.data = data;
  }

  getHash() {
    return bcrypt.hashSync(
      String(
        this.blockid +
          this.timestamp +
          this.blockhash +
          this.previousHash +
          JSON.stringify(this.data)
      ),
      10
    );
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }

  addBlock(data) {
    let blockid = this.chain.length;
    let previousHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].blockhash : "";
    let block = new Block(blockid, previousHash, data);

    this.chain.push(block);
  }
}


const MyFirstBC = new BlockChain();

MyFirstBC.addBlock({
    sender: "noel",
    receiver: "poo",
    amount: 666
});
MyFirstBC.addBlock({
    sender: "limxy",
    receiver: "noel",
    amount: 1000
});
MyFirstBC.addBlock({
    sender: "poo",
    receiver: "limxy", 
    amount: 999
})

console.log(JSON.stringify(MyFirstBC, null, 6));