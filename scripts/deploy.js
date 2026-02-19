import hre from "hardhat";

async function main() {
    const PaymentGateway = await hre.ethers.getContractFactory("PaymentGateway");
    const paymentGateway = await PaymentGateway.deploy();
    await paymentGateway.waitForDeployment();
    console.log("PaymentGateway deployed to:", await paymentGateway.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});