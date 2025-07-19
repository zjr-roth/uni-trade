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
import { DashboardLayout } from "./components/dashboard/DashboardLayout";

// Place in: src/app/page.tsx

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
		return <DashboardLayout />;
	}

	return <LandingPage />;
}
