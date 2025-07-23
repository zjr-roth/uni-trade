// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TradingVault is ReentrancyGuard {
    struct Member {
        uint256 depositAmount;
        uint256 sharePercentage;
        bool isActive;
    }

    struct Proposal {
        uint256 id;
        address proposer;
        address tokenIn; // Address(0) for ETH
        address tokenOut;
        uint256 amountIn;
        uint256 minAmountOut;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        uint256 createdAt;
        string description;
    }

    // Vault properties
    string public name;
    uint256 public votingThreshold; // Percentage (60 = 60%)
    uint256 public totalMembers;
    uint256 public totalDeposits;
    uint256 public proposalCounter;

    // Mappings
    mapping(address => Member) public members;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    address[] public memberList;

    // Events
    event MemberAdded(address indexed member, uint256 sharePercentage);
    event Deposited(address indexed member, uint256 amount);
    event Withdrawn(address indexed member, uint256 amount);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer);
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support
    );
    event ProposalExecuted(uint256 indexed proposalId);
    event TradeExecuted(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    modifier onlyMember() {
        require(members[msg.sender].isActive, "Not an active member");
        _;
    }

    modifier proposalExists(uint256 proposalId) {
        require(proposalId < proposalCounter, "Proposal does not exist");
        _;
    }

    constructor(
        string memory _name,
        uint256 _votingThreshold,
        address[] memory _members
    ) {
        require(
            _votingThreshold > 0 && _votingThreshold <= 100,
            "Invalid voting threshold"
        );
        require(_members.length > 0, "Must have at least one member");

        name = _name;
        votingThreshold = _votingThreshold;
        totalMembers = _members.length;

        // Add initial members with equal share
        uint256 sharePerMember = 100 / _members.length;

        for (uint256 i = 0; i < _members.length; i++) {
            members[_members[i]] = Member({
                depositAmount: 0,
                sharePercentage: sharePerMember,
                isActive: true
            });
            memberList.push(_members[i]);
            emit MemberAdded(_members[i], sharePerMember);
        }
    }

    // Deposit ETH into vault
    function deposit() external payable onlyMember nonReentrant {
        require(msg.value > 0, "Must deposit more than 0");

        members[msg.sender].depositAmount += msg.value;
        totalDeposits += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    // Withdraw ETH from vault (simplified for MVP)
    function withdraw(uint256 amount) external onlyMember nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            members[msg.sender].depositAmount >= amount,
            "Insufficient balance"
        );
        require(address(this).balance >= amount, "Insufficient vault balance");

        members[msg.sender].depositAmount -= amount;
        totalDeposits -= amount;

        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Create a trade proposal
    function proposeTrade(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        string memory description
    ) external onlyMember returns (uint256) {
        require(tokenOut != address(0), "Invalid token address");
        require(amountIn > 0, "Amount must be greater than 0");

        // Check if vault has sufficient balance
        if (tokenIn == address(0)) {
            // ETH
            require(
                address(this).balance >= amountIn,
                "Insufficient ETH balance"
            );
        } else {
            require(
                IERC20(tokenIn).balanceOf(address(this)) >= amountIn,
                "Insufficient token balance"
            );
        }

        uint256 proposalId = proposalCounter++;

        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            amountIn: amountIn,
            minAmountOut: minAmountOut,
            votesFor: 0,
            votesAgainst: 0,
            executed: false,
            createdAt: block.timestamp,
            description: description
        });

        emit ProposalCreated(proposalId, msg.sender);
        return proposalId;
    }

    // Vote on a proposal
    function vote(
        uint256 proposalId,
        bool support
    ) external onlyMember proposalExists(proposalId) {
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposals[proposalId].votesFor++;
        } else {
            proposals[proposalId].votesAgainst++;
        }

        emit VoteCast(proposalId, msg.sender, support);
    }

    // Execute proposal if it meets threshold
    function executeProposal(
        uint256 proposalId
    ) external proposalExists(proposalId) nonReentrant {
        Proposal storage proposal = proposals[proposalId];

        require(!proposal.executed, "Proposal already executed");

        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        require(totalVotes > 0, "No votes cast");

        uint256 approvalPercentage = (proposal.votesFor * 100) / totalVotes;
        require(approvalPercentage >= votingThreshold, "Insufficient votes");

        proposal.executed = true;

        // TODO: In Phase 4, implement actual DEX integration here
        // For now, just emit event to simulate trade
        emit TradeExecuted(
            proposal.tokenIn,
            proposal.tokenOut,
            proposal.amountIn,
            0
        );
        emit ProposalExecuted(proposalId);
    }

    // View functions - simplified to avoid stack depth
    function getProposalBasic(
        uint256 proposalId
    )
        external
        view
        proposalExists(proposalId)
        returns (
            address proposer,
            address tokenIn,
            address tokenOut,
            uint256 amountIn,
            string memory description
        )
    {
        Proposal memory proposal = proposals[proposalId];
        return (
            proposal.proposer,
            proposal.tokenIn,
            proposal.tokenOut,
            proposal.amountIn,
            proposal.description
        );
    }

    function getProposalVotes(
        uint256 proposalId
    )
        external
        view
        proposalExists(proposalId)
        returns (
            uint256 votesFor,
            uint256 votesAgainst,
            bool executed,
            uint256 createdAt
        )
    {
        Proposal memory proposal = proposals[proposalId];
        return (
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed,
            proposal.createdAt
        );
    }

    function getMemberInfo(
        address memberAddress
    )
        external
        view
        returns (uint256 depositAmount, uint256 sharePercentage, bool isActive)
    {
        Member memory member = members[memberAddress];
        return (member.depositAmount, member.sharePercentage, member.isActive);
    }

    function getVaultBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getAllMembers() external view returns (address[] memory) {
        return memberList;
    }

    function checkVoteStatus(
        uint256 proposalId,
        address voter
    ) external view proposalExists(proposalId) returns (bool) {
        return hasVoted[proposalId][voter];
    }

    // Allow vault to receive ETH
    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }
}
