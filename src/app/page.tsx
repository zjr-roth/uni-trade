"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import VaultShowcase from "./components/VaultShowcase";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

// This would be your main dashboard component
function Dashboard() {
	const { user, signOut } = useAuth();

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
								UniTrade
							</h1>
						</div>
						<div className="flex items-center space-x-4">
							<span className="text-gray-700">
								Welcome,{" "}
								{user?.user_metadata?.username || user?.email}!
							</span>
							<button
								onClick={signOut}
								className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
							>
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
					<p className="text-gray-600 mb-4">
						Welcome to UniTrade! This is where your trading
						dashboard will be.
					</p>
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<p className="text-blue-800">
							🚧 Dashboard features coming soon! This is where
							you'll manage your trades, vaults, and view
							analytics.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// Landing page component
function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
			<Navbar />

			<section className="pt-20 pb-16 px-4">
				<Hero />
			</section>

			<section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
				<Stats />
			</section>

			<section className="py-20 px-4">
				<Features />
			</section>

			<section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
				<HowItWorks />
			</section>

			<section className="py-20 px-4">
				<VaultShowcase />
			</section>

			<section className="py-20 px-4">
				<CTA />
			</section>

			<Footer />
		</div>
	);
}

export default function Home() {
	const { user, loading } = useAuth();

	// Show loading while checking auth state
	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex items-center justify-center">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Show dashboard if user is authenticated, otherwise show landing page
	if (user) {
		return <Dashboard />;
	}

	return <LandingPage />;
}
