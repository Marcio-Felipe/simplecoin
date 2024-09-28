const {ethers} = require('hardhat');
const {expect} = require("chai")

describe("SimpleCointest", function () {

    let simpleCoin;

    beforeEach(async function () {
        const SimpleCoin = await ethers.getContractFactory("SimpleCoin");
        simpleCoin = await SimpleCoin.deploy();
        [acc1,acc2] = await ethers.getSigners();
    });

    it("contract name ins intelligent", async function () {
        const name = await simpleCoin.name();
        expect(name).to.eql("intelligent");
    })

    it("contract symbol ins BITC", async function () {

        const symbol = await simpleCoin.symbol();
        expect(symbol).to.eql("BITC");
    })

    it("total supply", async function () {
        const supply = await simpleCoin.totalSupply()
        expect(supply).to.eql(10000n);
    })

    it("balance of account deploy is equal to total supply", async function () {
        const balance = await simpleCoin.balanceOf(acc1.address);
        expect(balance).to.eql(10000n);
    })

    it ("send token acc1 to acc2 , the balance of the acc1 get lower", async function () {

        const balanceBeforeAcc1 = await simpleCoin.balanceOf(acc1);
        await simpleCoin.transfer(acc2.address, 100);
        const balanceAfterAcc1 = await simpleCoin.balanceOf(acc1);
        expect(balanceBeforeAcc1 - balanceAfterAcc1).to.eql(100n);


    })

    it ("acc2 get higher", async function () {

        const balanceBeforeAcc1 = await simpleCoin.balanceOf(acc2);
        await simpleCoin.transfer(acc2.address, 100);
        const balanceAfterAcc2 = await simpleCoin.balanceOf(acc2);
        expect(balanceAfterAcc2 -balanceBeforeAcc1).to.eql(100n);


    })


})