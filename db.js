var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Block = new Schema({
    "number": {
        type: Number,
        index: {
            unique: true
        }
    },
    "hash": String,
    "parentHash": String,
    "nonce": String,
    "sha3Uncles": String,
    "logsBloom": String,
    "transactionsRoot": String,
    "stateRoot": String,
    "receiptRoot": String,
    "miner": String,
    "difficulty": String,
    "totalDifficulty": String,
    "size": Number,
    "extraData": String,
    "gasLimit": Number,
    "gasUsed": Number,
    "timestamp": Number,
    "uncles": [String]
});

var Contract = new Schema({
    "address": {
        type: String,
        index: {
            unique: true
        }
    },
    "creationTransaction": String,
    "contractName": String,
    "compilerVersion": String,
    "optimization": Boolean,
    "sourceCode": String,
    "abi": String,
    "byteCode": String
}, {
    collection: "Contract"
});

var Transaction = new Schema({
    "hash": {
        type: String,
        index: {
            unique: true
        }
    },
    "nonce": Number,
    "blockHash": String,
    "blockNumber": Number,
    "transactionIndex": Number,
    "from": String,
    "to": String,
    "value": String,
    "gas": Number,
    "gasPrice": String,
    "timestamp": Number,
    "input": String
});

mongoose.model('Block', Block);
mongoose.model('Contract', Contract);
mongoose.model('Transaction', Transaction);
module.exports.Block = mongoose.model('Block');
module.exports.Contract = mongoose.model('Contract');
module.exports.Transaction = mongoose.model('Transaction');

mongoose.connect('mongodb://' + (process.env.MONGO_URI || 'localhost') + '/blockDB');
mongoose.set('debug', true);