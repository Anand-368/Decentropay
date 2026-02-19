import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("PaymentGateway", function () {
    let PaymentGateway;
    let paymentGateway;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        PaymentGateway = await ethers.getContractFactory("PaymentGateway");
        paymentGateway = await PaymentGateway.deploy();
    });

    describe("Transactions", function () {
        it("Should send payments correctly", async function () {
            const amount = ethers.parseEther("1.0");
            const message = "Test Payment";

            // Check initial balance
            const initialBalance = await ethers.provider.getBalance(addr1.address);

            // Send payment
            await expect(paymentGateway.connect(owner).sendPayment(addr1.address, message, { value: amount }))
                .to.emit(paymentGateway, "PaymentSent")
                .withArgs(owner.address, addr1.address, amount, message, (await ethers.provider.getBlock("latest")).timestamp + 1); // Timestamp approximation

            // Check final balance
            const finalBalance = await ethers.provider.getBalance(addr1.address);
            expect(finalBalance).to.equal(initialBalance + amount);
        });

        it("Should fail if amount is 0", async function () {
            await expect(
                paymentGateway.connect(owner).sendPayment(addr1.address, "Zero", { value: 0 })
            ).to.be.revertedWith("Payment amount must be greater than zero");
        });

        it("Should fail if sender is recipient", async function () {
            await expect(
                paymentGateway.connect(owner).sendPayment(owner.address, "Self", { value: 100 })
            ).to.be.revertedWith("Cannot send payment to yourself");
        });

        it("Should increment transaction count", async function () {
            await paymentGateway.connect(owner).sendPayment(addr1.address, "Tx 1", { value: 100 });
            await paymentGateway.connect(addr1).sendPayment(addr2.address, "Tx 2", { value: 200 });

            expect(await paymentGateway.getTransactionCount()).to.equal(2);
        });
    });
});
