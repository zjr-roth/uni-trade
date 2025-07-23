// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./TradingVault.sol";

contract VaultFactory {
    struct VaultInfo {
        address vaultAddress;
        string name;
        address creator;
        uint256 createdAt;
        uint256 memberCount;
    }

    mapping(address => VaultInfo[]) public userVaults;
    mapping(address => bool) public isVault;
    VaultInfo[] public allVaults;

    event VaultCreated(
        address indexed vaultAddress,
        string name,
        address indexed creator,
        uint256 memberCount
    );

    function createVault(
        string memory _name,
        uint256 _votingThreshold,
        address[] memory _members
    ) external returns (address) {
        require(bytes(_name).length > 0, "Vault name cannot be empty");
        require(_members.length > 0, "Must have at least one member");

        // Ensure creator is included in members
        bool creatorIncluded = false;
        for (uint256 i = 0; i < _members.length; i++) {
            if (_members[i] == msg.sender) {
                creatorIncluded = true;
                break;
            }
        }
        require(creatorIncluded, "Creator must be included in members");

        // Deploy new vault
        TradingVault newVault = new TradingVault(
            _name,
            _votingThreshold,
            _members
        );
        address vaultAddress = address(newVault);

        // Mark as official vault
        isVault[vaultAddress] = true;

        // Create vault info
        VaultInfo memory vaultInfo = VaultInfo({
            vaultAddress: vaultAddress,
            name: _name,
            creator: msg.sender,
            createdAt: block.timestamp,
            memberCount: _members.length
        });

        // Add to all vaults
        allVaults.push(vaultInfo);

        // Add to each member's vault list
        for (uint256 i = 0; i < _members.length; i++) {
            userVaults[_members[i]].push(vaultInfo);
        }

        emit VaultCreated(vaultAddress, _name, msg.sender, _members.length);
        return vaultAddress;
    }

    function getUserVaults(
        address user
    ) external view returns (VaultInfo[] memory) {
        return userVaults[user];
    }

    function getAllVaults() external view returns (VaultInfo[] memory) {
        return allVaults;
    }

    function getTotalVaults() external view returns (uint256) {
        return allVaults.length;
    }

    function getVaultInfo(
        address vaultAddress
    ) external view returns (VaultInfo memory) {
        require(isVault[vaultAddress], "Not a valid vault");

        // Find vault info (in production, we'd optimize this)
        for (uint256 i = 0; i < allVaults.length; i++) {
            if (allVaults[i].vaultAddress == vaultAddress) {
                return allVaults[i];
            }
        }
        revert("Vault not found");
    }
}
