import { ethers } from "hardhat";

async function main() {
  console.log("Deploying UniTrade contracts...");

  // Deploy VaultFactory
  const VaultFactory = await ethers.getContractFactory("VaultFactory");
  const vaultFactory = await VaultFactory.deploy();

  await vaultFactory.waitForDeployment();
  const vaultFactoryAddress = await vaultFactory.getAddress();

  console.log("VaultFactory deployed to:", vaultFactoryAddress);

  // Test deployment by creating a sample vault
  const [deployer, member1, member2] = await ethers.getSigners();

  console.log("Creating test vault...");
  const createVaultTx = await vaultFactory.createVault(
    "Test Vault",
    60, // 60% voting threshold
    [deployer.address, member1.address, member2.address]
  );

  const receipt = await createVaultTx.wait();

  // Get the vault address from the event
  const vaultCreatedEvent = receipt?.logs.find((log: any) => {
    try {
      return vaultFactory.interface.parseLog(log)?.name === 'VaultCreated';
    } catch {
      return false;
    }
  });

  if (vaultCreatedEvent) {
    const parsedLog = vaultFactory.interface.parseLog(vaultCreatedEvent);
    const vaultAddress = parsedLog?.args[0];
    console.log("Test vault created at:", vaultAddress);

    // Test vault functionality
    const TradingVault = await ethers.getContractFactory("TradingVault");
    const vault = TradingVault.attach(vaultAddress);

    console.log("Vault name:", await vault.name());
    console.log("Voting threshold:", await vault.votingThreshold());
    console.log("Total members:", await vault.totalMembers());
  }

  console.log("\nDeployment complete!");
  console.log("===============================");
  console.log("VaultFactory:", vaultFactoryAddress);
  console.log("Network:", await ethers.provider.getNetwork());
  console.log("===============================");

  // Save deployment addresses for frontend
  const fs = require('fs');
  const deploymentInfo = {
    VaultFactory: vaultFactoryAddress,
    network: (await ethers.provider.getNetwork()).name,
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './deployments.json',
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployments.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});