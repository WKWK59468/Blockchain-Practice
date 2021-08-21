const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() { //創始區塊
        return new Block(0, "2021/08/20", "Genesis block", "0");
    }

    getLatestBlock() {　 //取得前一個區塊
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) { //新增區塊
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
savjeeCoin.addBlock(new Block(1, "2021/08/21", { amount: 4 }));
savjeeCoin.addBlock(new Block(2, "2021/08/22", { amount: 10 }));


console.log('Is blockchain valid?' + savjeeCoin.isChainValid());

savjeeCoin.chain[1].data = { amount: 100 };
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();

console.log('Is blockchain valid?' + savjeeCoin.isChainValid());


// console.log(JSON.stringify(savjeeCoin, null, 4));