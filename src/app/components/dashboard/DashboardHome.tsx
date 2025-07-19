"use client";

import React from "react";

export function DashboardHome() {
	const portfolioData = {
		totalValue: 45280.32,
		change: 1234.56,
		changePercent: 2.81,
		activeVaults: 3,
		pendingProposals: 3,
		vaultHoldings: 36340,
	};

	const recentTrades = [
		{
			type: "BUY",
			asset: "BTC",
			amount: "0.5",
			price: "$43,200",
			time: "2 hours ago",
			status: "completed",
		},
		{
			type: "SELL",
			asset: "ETH",
			amount: "2.3",
			price: "$2,650",
			time: "5 hours ago",
			status: "pending",
		},
		{
			type: "BUY",
			asset: "SOL",
			amount: "50",
			price: "$98.5",
			time: "1 day ago",
			status: "completed",
		},
	];

	const vaults = [
		{
			name: "DeFi Legends",
			performance: "+12.5%",
			yourShare: "$15,625",
			totalValue: "$125,000",
			members: 8,
			pendingProposals: 2,
		},
		{
			name: "Moonshot Collective",
			performance: "-3.2%",
			yourShare: "$5,933",
			totalValue: "$89,000",
			members: 15,
			pendingProposals: 1,
		},
		{
			name: "Steady Gains",
			performance: "+8.7%",
			yourShare: "$14,782",
			totalValue: "$340,000",
			members: 23,
			pendingProposals: 0,
		},
	];

	return (
		<div className="p-6">
			{/* Portfolio Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white rounded-lg shadow-sm border p-6">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium text-gray-600">
							Total Portfolio Value
						</h3>
						<svg
							className="w-5 h-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
					</div>
					<div className="text-3xl font-bold text-gray-900 mb-2">
						${portfolioData.totalValue.toLocaleString()}
					</div>
					<div className="flex items-center text-sm">
						<span className="text-green-600 font-medium">
							+${portfolioData.change.toLocaleString()} (+
							{portfolioData.changePercent}%)
						</span>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm border p-6">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium text-gray-600">
							Active Vaults
						</h3>
						<svg
							className="w-5 h-5 text-gray-400"
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
					<div className="text-3xl font-bold text-gray-900 mb-2">
						{portfolioData.activeVaults}
					</div>
					<div className="text-sm text-gray-500">
						{portfolioData.pendingProposals} pending proposals
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm border p-6">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium text-gray-600">
							Vault Holdings
						</h3>
						<svg
							className="w-5 h-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
							/>
						</svg>
					</div>
					<div className="text-3xl font-bold text-gray-900 mb-2">
						${portfolioData.vaultHoldings.toLocaleString()}
					</div>
					<div className="text-sm text-gray-500">
						Across {portfolioData.activeVaults} vaults
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Trades */}
				<div className="bg-white rounded-lg shadow-sm border">
					<div className="p-6 border-b border-gray-200">
						<h3 className="text-lg font-semibold text-gray-900">
							Recent Trades
						</h3>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{recentTrades.map((trade, index) => (
								<div
									key={index}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-3">
										<span
											className={`px-2 py-1 text-xs font-medium rounded ${
												trade.type === "BUY"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{trade.type}
										</span>
										<div>
											<p className="font-medium text-gray-900">
												{trade.asset}
											</p>
											<p className="text-sm text-gray-500">
												{trade.time}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-medium text-gray-900">
											{trade.amount} @ {trade.price}
										</p>
										<span
											className={`text-xs px-2 py-1 rounded-full ${
												trade.status === "completed"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{trade.status}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Your Vaults */}
				<div className="bg-white rounded-lg shadow-sm border">
					<div className="p-6 border-b border-gray-200 flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-900">
							Your Vaults
						</h3>
						<button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
							+ Create Vault
						</button>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{vaults.map((vault, index) => (
								<div
									key={index}
									className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
								>
									<div className="flex items-center justify-between mb-2">
										<h4 className="font-medium text-gray-900">
											{vault.name}
										</h4>
										<span
											className={`text-sm font-medium ${
												vault.performance.startsWith(
													"+"
												)
													? "text-green-600"
													: "text-red-600"
											}`}
										>
											{vault.performance}
										</span>
									</div>
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-gray-500">
												Your Share
											</p>
											<p className="font-medium text-gray-900">
												{vault.yourShare}
											</p>
										</div>
										<div>
											<p className="text-gray-500">
												Total Value
											</p>
											<p className="font-medium text-gray-900">
												{vault.totalValue}
											</p>
										</div>
									</div>
									<div className="flex items-center justify-between mt-3 text-sm text-gray-500">
										<span>{vault.members} members</span>
										{vault.pendingProposals > 0 && (
											<span className="text-blue-600 font-medium">
												{vault.pendingProposals}{" "}
												proposal(s) need your vote
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
