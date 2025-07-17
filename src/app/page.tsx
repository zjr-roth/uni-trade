import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import VaultShowcase from "./components/VaultShowcase";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import React from "react";
import Footer from "./components/Footer";
export default function Home() {
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
