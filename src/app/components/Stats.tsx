import React from "react";

const Stats = () => {
	const stats = [
		{ number: "$2.4M+", label: "Total Volume Traded" },
		{ number: "1,250+", label: "Active Traders" },
		{ number: "89", label: "Trading Vaults" },
		{ number: "99.9%", label: "Uptime" },
	];

	return (
		<div className="max-w-4xl mx-auto">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
				{stats.map((stat, index) => (
					<div key={index} className="text-center">
						<div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
							{stat.number}
						</div>
						<div className="text-gray-600 font-medium">
							{stat.label}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Stats;
