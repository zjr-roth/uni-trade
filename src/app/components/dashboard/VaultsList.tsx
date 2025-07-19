"use client";

import React, { useState } from "react";
import { VaultDetail } from "./VaultDetail";

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

export function VaultsList() {
	const [selectedVault, setSelectedVault] = useState<Vault | null>(null);

	const vaults: Vault[] = [
		{
			id: "1",
			name: "DeFi Legends",
			description:
				"A collaborative vault focused on DeFi opportunities and long-term growth strategies.",
			totalValue: "$125,000",
			performance: "+12.5%",
			members: 8,
			yourShare: "$15,625",
			sharePercentage: "12.5%",
			pendingProposals: 2,
			votingThreshold: 60,
			createdDate: "December 2023",
		},
		{
			id: "2",
			name: "Moonshot Collective",
			description:
				"High-risk, high-reward investments in emerging cryptocurrencies and tokens.",
			totalValue: "$89,000",
			performance: "-3.2%",
			members: 15,
			yourShare: "$5,933",
			sharePercentage: "6.7%",
			pendingProposals: 1,
			votingThreshold: 75,
			createdDate: "January 2024",
		},
		{
			id: "3",
			name: "Steady Gains",
			description:
				"Conservative trading strategy focused on stable, long-term cryptocurrency investments.",
			totalValue: "$340,000",
			performance: "+8.7%",
			members: 23,
			yourShare: "$14,782",
			sharePercentage: "4.3%",
			pendingProposals: 0,
			votingThreshold: 80,
			createdDate: "November 2023",
		},
	];

	if (selectedVault) {
		return (
			<VaultDetail
				vault={selectedVault}
				onBack={() => setSelectedVault(null)}
			/>
		);
	}

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Your Vaults
					</h1>
					<p className="text-gray-600 mt-1">
						Manage your collaborative trading vaults
					</p>
				</div>
				<button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center">
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
					Create Vault
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{vaults.map((vault) => (
					<div
						key={vault.id}
						onClick={() => setSelectedVault(vault)}
						className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
					>
						{/* Vault Header */}
						<div className="flex items-start justify-between mb-4">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									{vault.name}
								</h3>
								<span
									className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
										vault.performance.startsWith("+")
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{vault.performance}
								</span>
							</div>
							<div className="text-right">
								<div className="text-2xl font-bold text-gray-900">
									{vault.totalValue}
								</div>
								<div className="text-sm text-gray-500">
									Total Value
								</div>
							</div>
						</div>

						{/* Vault Description */}
						<p className="text-gray-600 text-sm mb-4 line-clamp-2">
							{vault.description}
						</p>

						{/* Vault Stats */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500">
									Members
								</span>
								<div className="flex items-center">
									<svg
										className="w-4 h-4 text-gray-400 mr-1"
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
									<span className="text-sm font-medium text-gray-900">
										{vault.members}
									</span>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500">
									Your Share
								</span>
								<div className="text-right">
									<div className="text-sm font-medium text-gray-900">
										{vault.yourShare}
									</div>
									<div className="text-xs text-gray-500">
										{vault.sharePercentage} share
									</div>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500">
									Created
								</span>
								<span className="text-sm text-gray-600">
									{vault.createdDate}
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500">
									Voting threshold
								</span>
								<span className="text-sm text-gray-600">
									{vault.votingThreshold}%
								</span>
							</div>
						</div>

						{/* Pending Proposals Alert */}
						{vault.pendingProposals > 0 && (
							<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="flex items-center">
									<svg
										className="w-4 h-4 text-blue-600 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span className="text-sm font-medium text-blue-800">
										{vault.pendingProposals} proposal(s)
										need your vote
									</span>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Empty State - if no vaults */}
			{vaults.length === 0 && (
				<div className="text-center py-12">
					<div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
						<svg
							className="w-12 h-12 text-gray-400"
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
					</div>
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						No vaults yet
					</h3>
					<p className="text-gray-500 mb-6">
						Create your first vault to start collaborative trading
					</p>
					<button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
						Create Your First Vault
					</button>
				</div>
			)}
		</div>
	);
}
