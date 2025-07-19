"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Place in: src/app/components/dashboard/ProfilePage.tsx

export function ProfilePage() {
	const { user, signOut } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		username: user?.user_metadata?.username || "zir2000",
		email: user?.email || "zir2000@example.com",
		fullName: user?.user_metadata?.full_name || "zir2000",
	});

	const tradingStats = {
		totalTrades: 156,
		successRate: 73,
		totalPnL: 8432.12,
		vaultsJoined: 3,
	};

	const walletConnections = [
		{
			network: "Ethereum",
			address: "0x742d35Cc6Bf8b1...9c5f3ec85f",
			balance: "2.345 ETH",
			status: "Connected",
		},
		{
			network: "Bitcoin",
			address: "BC1qxy2kgdygjr...h0h8c3t2",
			balance: "0.0234 BTC",
			status: "Connected",
		},
		{
			network: "Solana",
			address: "Not connected",
			balance: "-",
			status: "Not connected",
		},
	];

	const [notificationSettings, setNotificationSettings] = useState([
		{
			id: "tradeConfirmations",
			label: "Trade Confirmations",
			description: "Get notified when trades are executed",
			enabled: true,
		},
		{
			id: "vaultProposals",
			label: "Vault Proposals",
			description: "Get notified about new vault proposals",
			enabled: true,
		},
		{
			id: "priceAlerts",
			label: "Price Alerts",
			description: "Get notified about significant price movements",
			enabled: false,
		},
	]);

	const handleSave = () => {
		setIsEditing(false);
		// Here you would save the form data
		console.log("Saving profile data:", formData);
	};

	const handleCancel = () => {
		setIsEditing(false);
		// Reset form data to original values
		setFormData({
			username: user?.user_metadata?.username || "zir2000",
			email: user?.email || "zir2000@example.com",
			fullName: user?.user_metadata?.full_name || "zir2000",
		});
	};

	const toggleNotification = (id: string) => {
		setNotificationSettings((prev) =>
			prev.map((setting) =>
				setting.id === id
					? { ...setting, enabled: !setting.enabled }
					: setting
			)
		);
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			{/* Profile Header */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
				<div className="flex items-start justify-between">
					<div className="flex items-center space-x-6">
						<div className="w-20 h-20 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
							{formData.username.substring(0, 2).toUpperCase()}
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								{formData.username}
							</h1>
							<p className="text-gray-600">{formData.email}</p>
							<p className="text-sm text-gray-500">
								Member since January 2024
							</p>
						</div>
					</div>
					<button
						onClick={() => setIsEditing(!isEditing)}
						className="text-gray-500 hover:text-gray-700 transition-colors"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Wallet Connections */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold text-gray-900">
							Wallet Connections
						</h2>
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
								d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
							/>
						</svg>
					</div>

					<div className="space-y-4">
						{walletConnections.map((wallet, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
							>
								<div className="flex items-center space-x-3">
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
											wallet.network === "Ethereum"
												? "bg-blue-600"
												: wallet.network === "Bitcoin"
												? "bg-orange-500"
												: "bg-purple-600"
										}`}
									>
										{wallet.network.substring(0, 1)}
									</div>
									<div>
										<p className="font-medium text-gray-900">
											{wallet.status === "Connected"
												? wallet.status
												: "Not connected"}
										</p>
										<p className="text-sm text-gray-500">
											{wallet.balance}
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm text-gray-600 font-mono">
										{wallet.address}
									</p>
									{wallet.status === "Not connected" && (
										<button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
											Connect Solana Wallet
										</button>
									)}
								</div>
							</div>
						))}
					</div>

					{/* RainbowKit Connect Button */}
					<div className="mt-4 pt-4 border-t border-gray-200">
						<ConnectButton />
					</div>
				</div>

				{/* Trading Statistics */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold text-gray-900">
							Trading Statistics
						</h2>
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

					<div className="grid grid-cols-2 gap-4">
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<div className="text-2xl font-bold text-gray-900">
								{tradingStats.totalTrades}
							</div>
							<div className="text-sm text-gray-500">
								Total Trades
							</div>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<div className="text-2xl font-bold text-green-600">
								{tradingStats.successRate}%
							</div>
							<div className="text-sm text-gray-500">
								Success Rate
							</div>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<div className="text-2xl font-bold text-green-600">
								+${tradingStats.totalPnL.toLocaleString()}
							</div>
							<div className="text-sm text-gray-500">
								Total P&L
							</div>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<div className="text-2xl font-bold text-gray-900">
								{tradingStats.vaultsJoined}
							</div>
							<div className="text-sm text-gray-500">
								Vaults Joined
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Account Settings */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-semibold text-gray-900">
						Account Settings
					</h2>
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
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Personal Information */}
					<div>
						<h3 className="text-md font-medium text-gray-900 mb-4">
							Personal Information
						</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Username
								</label>
								<input
									type="text"
									value={formData.username}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											username: e.target.value,
										}))
									}
									disabled={!isEditing}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<input
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
									disabled={!isEditing}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
								/>
							</div>
						</div>

						{isEditing && (
							<div className="flex space-x-3 mt-4">
								<button
									onClick={handleSave}
									className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
								>
									Save Changes
								</button>
								<button
									onClick={handleCancel}
									className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
								>
									Cancel
								</button>
							</div>
						)}
					</div>

					{/* Notification Preferences */}
					<div>
						<h3 className="text-md font-medium text-gray-900 mb-4">
							Notification Preferences
						</h3>
						<div className="space-y-4">
							{notificationSettings.map((setting) => (
								<div
									key={setting.id}
									className="flex items-center justify-between"
								>
									<div>
										<p className="font-medium text-gray-900">
											{setting.label}
										</p>
										<p className="text-sm text-gray-500">
											{setting.description}
										</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={setting.enabled}
											className="sr-only peer"
											onChange={() =>
												toggleNotification(setting.id)
											}
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Security Section */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-semibold text-gray-900">
						Security
					</h2>
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
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
						<h4 className="font-medium text-gray-900 mb-1">
							Change Password
						</h4>
						<p className="text-sm text-gray-500">
							Update your account password
						</p>
					</button>

					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
						<h4 className="font-medium text-gray-900 mb-1">
							Enable Two-Factor Authentication
						</h4>
						<p className="text-sm text-gray-500">
							Add an extra layer of security
						</p>
					</button>

					<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
						<h4 className="font-medium text-gray-900 mb-1">
							Download Backup Codes
						</h4>
						<p className="text-sm text-gray-500">
							Save recovery codes safely
						</p>
					</button>
				</div>
			</div>

			{/* Danger Zone */}
			<div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 mt-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-red-600">
						Danger Zone
					</h2>
					<svg
						className="w-5 h-5 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>

				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-medium text-gray-900">Sign Out</h3>
						<p className="text-sm text-gray-500">
							Sign out of your account on this device
						</p>
					</div>
					<button
						onClick={signOut}
						className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	);
}
