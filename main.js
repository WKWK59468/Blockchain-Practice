const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(); //加密
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined" + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() { //創始區塊
        return new Block(0, "2021/08/20", "Genesis block", "0");
    }

    getLatestBlock() {　 //取得前一個區塊
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) { //新增區塊
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() { //驗證區塊
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]; //當前的區塊
            const previousBlock = this.chain[i - 1]; //前一個區塊

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const savjeeCoin = new Blockchain();

console.log('Mining block 1...');
savjeeCoin.addBlock(new Block(1, "2021/08/21", { amount: 4 }));

console.log('Mining block 2...');
savjeeCoin.addBlock(new Block(2, "2021/08/22", { amount: 10 }));


// console.log('Is blockchain valid?' + savjeeCoin.isChainValid());

// savjeeCoin.chain[1].data = { amount: 100 };
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();

// console.log('Is blockchain valid?' + savjeeCoin.isChainValid());


// console.log(JSON.stringify(savjeeCoin, null, 4));