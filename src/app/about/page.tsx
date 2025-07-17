import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Page = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="flex-1 py-20 px-4">
				<h1 className="text-4xl font-bold text-center ">
					About UniTrade
				</h1>
				<p className="mt-4 text-center text-gray-600">
					UniTrade is a decentralized trading platform that empowers
					users to trade securely and efficiently.
				</p>
				<div className="max-w-2xl mx-auto mt-10">
					<h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
					<p className="text-gray-700">
						Our mission is to provide a transparent and
						user-friendly trading experience that allows individuals
						to take control of their financial future.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Page;
