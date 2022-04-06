const assert = require('assert');
const { isTypedArray } = require('util/types');
const Web3 = require('web3');//requires web3
const web3 = new Web3('HTTP://127.0.0.1:7545');// connecting to ganache
const data = require('../build/contracts/minting.json');//on deployment, converted contracts to bytecode (json)
const abiArray = data.abi;//helps interact with the bytecode
const contract_address='0x02771479245FF74De9f512f3ceE4d1A0e7a91929';

let accounts;
let instanceContract;
//before each test, beforeEach executes to create an instance of the contract
beforeEach(async () =>{
    accounts = await web3.eth.getAccounts();//web3.eth is the library to connect with eth blockchains
    instanceContract = await new web3.eth.Contract(abiArray,contract_address)//connects contract to blockchain and converts to executable js code
});
//each test = it func, for multiple tests nest them inside a describe
describe('minting', ()=>{
    it ('checks owner', async ()=>{
        let owner = await instanceContract.methods.owner().call()
        assert.equal(owner,accounts[0])
    });
    it ('checks owner of token1', async()=>{
        const tokenURI = 'Example';
        await instanceContract.methods.mintNFT(tokenURI).send({from: accounts[0],gas: '1000000' });
        let owner = await instanceContract.methods.ownerOf(1).call();
        assert.equal(owner,accounts[0]);
    });
});