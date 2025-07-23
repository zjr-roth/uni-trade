import { expect } from "chai";
import { ethers } from "hardhat";

describe("VaultFactory", function () {
  let vaultFactory: any;
  let owner: any, member1: any, member2: any;

  beforeEach(async function () {
    [owner, member1, member2] = await ethers.getSigners();

    const VaultFactory = await ethers.getContractFactory("VaultFactory");
    vaultFactory = await VaultFactory.deploy();
    await vaultFactory.waitForDeployment();
  });

  it("Should create a new vault", async function () {
    const vaultName = "Test Vault";
    const votingThreshold = 60;
    const members = [owner.address, member1.address];

    const tx = await vaultFactory.createVault(vaultName, votingThreshold, members);
    const receipt = await tx.wait();

    // Check if VaultCreated event was emitted
    expect(receipt?.logs.length).to.be.greaterThan(0);

    // Check user vaults
    const userVaults = await vaultFactory.getUserVaults(owner.address);
    expect(userVaults.length).to.equal(1);
    expect(userVaults[0].name).to.equal(vaultName);
  });

  it("Should allow deposits and proposals", async function () {
    // Create vault
    const tx = await vaultFactory.createVault(
      "Test Vault",
      60,
      [owner.address, member1.address]
    );
    const receipt = await tx.wait();

    // Get vault address from event logs
    let vaultAddress = "";
    for (const log of receipt!.logs) {
      try {
        const parsedLog = vaultFactory.interface.parseLog(log);
        if (parsedLog && parsedLog.name === 'VaultCreated') {
          vaultAddress = parsedLog.args[0];
          break;
        }
      } catch (e) {
        // Skip logs that can't be parsed
        continue;
      }
    }

    expect(vaultAddress).to.not.equal("");

    // Connect to vault using 'any' type to avoid TypeScript issues
    const TradingVault = await ethers.getContractFactory("TradingVault");
    const vault: any = TradingVault.attach(vaultAddress);

    // Test deposit
    const depositTx = await vault.connect(owner).deposit({ value: ethers.parseEther("1") });
    await depositTx.wait();

    const balance = await vault.getVaultBalance();
    expect(balance).to.equal(ethers.parseEther("1"));

    // Test proposal creation
    const tokenOut = "0x" + "1".repeat(40); // Dummy token address
    const proposalTx = await vault.connect(owner).proposeTrade(
      ethers.ZeroAddress, // ETH
      tokenOut,
      ethers.parseEther("0.5"),
      0,
      "Test trade proposal"
    );
    await proposalTx.wait();

    // Get proposal details
    const proposalBasic = await vault.getProposalBasic(0);
    expect(proposalBasic.proposer).to.equal(owner.address);
    expect(proposalBasic.description).to.equal("Test trade proposal");

    console.log("✅ Test completed successfully!");
    console.log("Vault created at:", vaultAddress);
    console.log("Vault balance:", ethers.formatEther(balance), "ETH");
  });

  it("Should handle voting correctly", async function () {
    // Create vault with 3 members
    const tx = await vaultFactory.createVault(
      "Voting Test Vault",
      67, // 67% threshold (2 out of 3 votes needed)
      [owner.address, member1.address, member2.address]
    );
    const receipt = await tx.wait();

    // Get vault address
    let vaultAddress = "";
    for (const log of receipt!.logs) {
      try {
        const parsedLog = vaultFactory.interface.parseLog(log);
        if (parsedLog && parsedLog.name === 'VaultCreated') {
          vaultAddress = parsedLog.args[0];
          break;
        }
      } catch (e) {
        continue;
      }
    }

    const TradingVault = await ethers.getContractFactory("TradingVault");
    const vault: any = TradingVault.attach(vaultAddress);

    // Deposit some ETH
    await vault.connect(owner).deposit({ value: ethers.parseEther("2") });

    // Create a proposal
    const tokenOut = "0x" + "1".repeat(40);
    const proposalTx = await vault.connect(owner).proposeTrade(
      ethers.ZeroAddress,
      tokenOut,
      ethers.parseEther("1"),
      0,
      "Buy some tokens"
    );
    await proposalTx.wait();

    // Vote on the proposal
    await vault.connect(owner).vote(0, true); // Vote for
    await vault.connect(member1).vote(0, true); // Vote for

    // Check vote counts
    const proposalVotes = await vault.getProposalVotes(0);
    expect(proposalVotes.votesFor).to.equal(2);
    expect(proposalVotes.votesAgainst).to.equal(0);

    console.log("✅ Voting test completed!");
    console.log("Votes for:", proposalVotes.votesFor.toString());
    console.log("Votes against:", proposalVotes.votesAgainst.toString());
  });
});