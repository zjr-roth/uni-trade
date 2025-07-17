import React from "react";

const HowItWorks = () => {
	const steps = [
		{
			number: "1",
			title: "Connect Your Wallet",
			description: "Link your crypto wallet securely to the platform",
			icon: "🔗",
		},
		{
			number: "2",
			title: "Choose Your Path",
			description:
				"Trade individually or create/join a collaborative vault",
			icon: "🛤️",
		},
		{
			number: "3",
			title: "Start Trading",
			description:
				"Execute trades solo or vote on proposals with your vault members",
			icon: "📈",
		},
	];

	return (
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-12">
				<h2 className="text-4xl font-bold text-gray-800 mb-4">
					How It Works
				</h2>
				<p className="text-xl text-gray-600">
					Get started in just three simple steps
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-8">
				{steps.map((step, index) => (
					<div key={index} className="text-center">
						<div className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
							{step.number}
						</div>
						<div className="text-4xl mb-4">{step.icon}</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-3">
							{step.title}
						</h3>
						<p className="text-gray-600">{step.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default HowItWorks;
