"use client";

import React, { useState } from "react";

interface Vault {
	id: string;
	name: string;
	description: string;
	totalValue: string;
	performance: string;
	members: number;
	yourShare: string;
	sharePercentage: string;
	pendingProposals: number;
	votingThreshold: number;
	createdDate: string;
}

interface VaultDetailProps {
	vault: Vault;
	onBack: () => void;
}

export function VaultDetail({ vault, onBack }: VaultDetailProps) {
	const [activeTab, setActiveTab] = useState<
		"proposals" | "members" | "portfolio" | "settings"
	>("proposals");

	const proposals = [
		{
			id: 1,
			type: "BUY",
			title: "Buy 10 ETH @ $2650",
			proposer: "cryptoking",
			description:
				"ETH is showing strong support at current levels and upcoming EIP updates should drive price higher.",
			votesFor: 3,
			votesAgainst: 1,
			totalVotes: 4,
			timeRemaining: "2 days remaining",
			progress: 38,
			threshold: 60,
		},
		{
			id: 2,
			type: "SELL",
			title: "Sell 500 LINK @ $15.2",
			proposer: "defi_master",
			description:
				"LINK has reached our target price. Time to take profits and reallocate to other opportunities.",
			votesFor: 5,
			votesAgainst: 2,
			totalVotes: 7,
			timeRemaining: "1 day remaining",
			progress: 63,
			threshold: 60,
		},
	];

	const members = [
		{
			username: "zir2000",
			share: "$15,625",
			percentage: "12.5%",
			joinDate: "Dec 2023",
		},
		{
			username: "cryptoking",
			share: "$20,000",
			percentage: "16%",
			joinDate: "Dec 2023",
		},
		{
			username: "defi_master",
			share: "$18,750",
			percentage: "15%",
			joinDate: "Jan 2024",
		},
		{
			username: "hodler_supreme",
			share: "$12,500",
			percentage: "10%",
			joinDate: "Jan 2024",
		},
		{
			username: "yield_farmer",
			share: "$25,000",
			percentage: "20%",
			joinDate: "Dec 2023",
		},
	];

	const renderProposalsTab = () => (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">
					Active Proposals
				</h3>
				<button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
					+ New Proposal
				</button>
			</div>

			<div className="space-y-4">
				{proposals.map((proposal) => (
					<div
						key={proposal.id}
						className="bg-white border border-gray-200 rounded-lg p-6"
					>
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center space-x-3">
								<span
									className={`px-2 py-1 text-xs font-medium rounded ${
										proposal.type === "BUY"
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{proposal.type}
								</span>
								<div>
									<h4 className="font-medium text-gray-900">
										{proposal.title}
									</h4>
									<p className="text-sm text-gray-500">
										Proposed by {proposal.proposer}
									</p>
								</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-gray-500 flex items-center">
									<svg
										className="w-4 h-4 mr-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									{proposal.timeRemaining}
								</div>
							</div>
						</div>

						<p className="text-gray-600 mb-4">
							{proposal.description}
						</p>

						<div className="mb-4">
							<div className="flex items-center justify-between text-sm mb-2">
								<span>
									Votes: {proposal.votesFor} for,{" "}
									{proposal.votesAgainst} against
								</span>
								<span className="font-medium">
									Progress: {proposal.progress}% /{" "}
									{proposal.threshold}%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className={`h-2 rounded-full transition-all duration-300 ${
										proposal.progress >= proposal.threshold
											? "bg-green-500"
											: "bg-blue-500"
									}`}
									style={{
										width: `${Math.min(
											proposal.progress,
											100
										)}%`,
									}}
								/>
							</div>
						</div>

						<div className="flex space-x-3">
							<button className="flex-1 bg-green-50 text-green-700 border border-green-200 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center">
								<svg
									className="w-4 h-4 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								Vote For
							</button>
							<button className="flex-1 bg-red-50 text-red-700 border border-red-200 py-2 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center">
								<svg
									className="w-4 h-4 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
								Vote Against
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	const renderMembersTab = () => (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">
					Vault Members
				</h3>
				<button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
					+ Invite Member
				</button>
			</div>

			<div className="bg-white border border-gray-200 rounded-lg">
				{members.map((member, index) => (
					<div
						key={member.username}
						className={`p-4 flex items-center justify-between ${
							index !== members.length - 1
								? "border-b border-gray-200"
								: ""
						}`}
					>
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
								<span className="text-sm font-medium text-gray-700">
									{member.username
										.substring(0, 2)
										.toUpperCase()}
								</span>
							</div>
							<div>
								<p className="font-medium text-gray-900">
									{member.username}
								</p>
								<p className="text-sm text-gray-500">
									Joined {member.joinDate}
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-medium text-gray-900">
								{member.share}
							</p>
							<p className="text-sm text-gray-500">
								{member.percentage} share
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	const renderPortfolioTab = () => (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold text-gray-900">
				Vault Portfolio
			</h3>
			<div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
				<p className="text-gray-500">
					Portfolio breakdown and holdings will be displayed here.
				</p>
			</div>
		</div>
	);

	const renderSettingsTab = () => (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold text-gray-900">
				Vault Settings
			</h3>

			<div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Voting Threshold (%)
					</label>
					<input
						type="number"
						value={vault.votingThreshold}
						className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						readOnly
					/>
					<p className="text-sm text-gray-500 mt-1">
						Percentage of votes needed to pass a proposal
					</p>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Vault Name
					</label>
					<input
						type="text"
						value={vault.name}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						readOnly
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						value={vault.description}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
						readOnly
					/>
				</div>

				<button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors">
					Save Changes
				</button>
			</div>
		</div>
	);

	const renderTabContent = () => {
		switch (activeTab) {
			case "proposals":
				return renderProposalsTab();
			case "members":
				return renderMembersTab();
			case "portfolio":
				return renderPortfolioTab();
			case "settings":
				return renderSettingsTab();
			default:
				return renderProposalsTab();
		}
	};

	return (
		<div className="min-h-full">
			{/* Vault Header */}
			<div className="bg-white border-b border-gray-200 px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<button
							onClick={onBack}
							className="text-gray-500 hover:text-gray-700 transition-colors"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<div>
							<div className="flex items-center space-x-3">
								<h1 className="text-2xl font-bold text-gray-900">
									{vault.name}
								</h1>
								<span
									className={`px-2 py-1 text-sm font-medium rounded-full ${
										vault.performance.startsWith("+")
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{vault.performance}
								</span>
							</div>
							<p className="text-gray-600 mt-1">
								{vault.description}
							</p>
						</div>
					</div>
					<div className="text-right">
						<div className="text-3xl font-bold text-gray-900">
							{vault.totalValue}
						</div>
						<div className="text-sm text-gray-500">Total Value</div>
					</div>
				</div>

				<div className="mt-4 grid grid-cols-4 gap-6 text-sm">
					<div className="flex items-center">
						<svg
							className="w-4 h-4 text-gray-400 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<span className="text-gray-500">
							{vault.members} members
						</span>
					</div>
					<div>
						<span className="text-gray-500">Created </span>
						<span className="text-gray-900">
							{vault.createdDate}
						</span>
					</div>
					<div>
						<span className="text-gray-500">
							Voting threshold:{" "}
						</span>
						<span className="text-gray-900">
							{vault.votingThreshold}%
						</span>
					</div>
					<div>
						<span className="text-gray-500">Your share: </span>
						<span className="text-gray-900">{vault.yourShare}</span>
					</div>
				</div>
			</div>

			{/* Tab Navigation */}
			<div className="bg-gray-50 border-b border-gray-200">
				<div className="px-6">
					<nav className="flex space-x-8">
						{["proposals", "members", "portfolio", "settings"].map(
							(tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab as any)}
									className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
										activeTab === tab
											? "border-blue-500 text-blue-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									}`}
								>
									{tab}
								</button>
							)
						)}
					</nav>
				</div>
			</div>

			{/* Tab Content */}
			<div className="p-6">{renderTabContent()}</div>
		</div>
	);
}
