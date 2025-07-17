import React from "react";

const Features = () => {
	const features = [
		{
			icon: "💰",
			title: "Individual Trading",
			description:
				"Trade cryptocurrencies with your own wallet using advanced tools and real-time market data.",
		},
		{
			icon: "🏛️",
			title: "Collaborative Vaults",
			description:
				"Pool funds with other traders, vote on proposals, and execute trades together with customizable voting thresholds.",
		},
		{
			icon: "💬",
			title: "Built-in Chat",
			description:
				"Communicate with vault members, discuss strategies, and coordinate trades in real-time.",
		},
		{
			icon: "🗳️",
			title: "Democratic Voting",
			description:
				"Set voting thresholds when creating vaults and let the community decide on trade proposals.",
		},
		{
			icon: "🔒",
			title: "Secure Wallets",
			description:
				"Your funds remain secure with industry-standard encryption and multi-signature technology.",
		},
		{
			icon: "📊",
			title: "Advanced Analytics",
			description:
				"Access detailed trading analytics, performance metrics, and market insights.",
		},
	];

	return (
		<div className="max-w-6xl mx-auto">
			<div className="text-center mb-12">
				<h2 className="text-4xl font-bold text-gray-800 mb-4">
					Why Choose{" "}
					<span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
						UniTrade
					</span>
					?
				</h2>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					Experience the future of collaborative cryptocurrency
					trading with our innovative platform.
				</p>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map((feature, index) => (
					<div
						key={index}
						className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
					>
						<div className="text-4xl mb-4">{feature.icon}</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-3">
							{feature.title}
						</h3>
						<p className="text-gray-600 leading-relaxed">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Features;
