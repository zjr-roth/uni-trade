"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHome } from "./DashboardHome";
import { VaultsList } from "./VaultsList";
import { ProfilePage } from "./ProfilePage";

export function DashboardLayout() {
	const { user, signOut } = useAuth();
	const [activeTab, setActiveTab] = useState<
		"dashboard" | "vaults" | "profile"
	>("dashboard");

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return <DashboardHome />;
			case "vaults":
				return <VaultsList />;
			case "profile":
				return <ProfilePage />;
			default:
				return <DashboardHome />;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Top Navigation */}
			<div className="bg-gray-800 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-8">
							<h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
								UniTrade
							</h1>

							{/* Main Navigation */}
							<nav className="flex space-x-1">
								<button
									onClick={() => setActiveTab("dashboard")}
									className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
										activeTab === "dashboard"
											? "bg-gray-700 text-white"
											: "text-gray-300 hover:text-white hover:bg-gray-700"
									}`}
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 5a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
										/>
									</svg>
									Dashboard
								</button>

								<button
									onClick={() => setActiveTab("vaults")}
									className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
										activeTab === "vaults"
											? "bg-gray-700 text-white"
											: "text-gray-300 hover:text-white hover:bg-gray-700"
									}`}
								>
									<svg
										className="w-4 h-4 mr-2"
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
									Vaults
								</button>

								<button
									onClick={() => setActiveTab("profile")}
									className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
										activeTab === "profile"
											? "bg-gray-700 text-white"
											: "text-gray-300 hover:text-white hover:bg-gray-700"
									}`}
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									Profile
								</button>
							</nav>
						</div>

						{/* User Actions */}
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
									<span className="text-xs font-bold text-white">
										3
									</span>
								</div>
							</div>

							<div className="text-right">
								<p className="text-sm text-gray-300">
									Welcome,
								</p>
								<p className="text-sm font-medium text-white">
									{user?.user_metadata?.username || "zir2000"}
									!
								</p>
							</div>

							<div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
								<span className="text-sm font-bold text-gray-800">
									{(
										user?.user_metadata?.username ||
										user?.email ||
										"U"
									)
										.charAt(0)
										.toUpperCase()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className="min-h-[calc(100vh-4rem)]">{renderContent()}</main>
		</div>
	);
}
