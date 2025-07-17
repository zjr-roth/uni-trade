import React from "react";

const VaultShowcase = () => {
	return (
		<div className="max-w-6xl mx-auto">
			<div className="grid lg:grid-cols-2 gap-12 items-center">
				<div>
					<h2 className="text-4xl font-bold text-gray-800 mb-6">
						Revolutionary{" "}
						<span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Trading Vaults
						</span>
					</h2>
					<p className="text-lg text-gray-600 mb-6 leading-relaxed">
						Pool resources with like-minded traders, share
						strategies, and make collective decisions. Our vault
						system allows you to leverage the wisdom of crowds while
						maintaining security and transparency.
					</p>

					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<div className="bg-green-100 rounded-full p-2">
								<svg
									className="w-5 h-5 text-green-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800">
									Customizable Voting Thresholds
								</h4>
								<p className="text-gray-600">
									Set the percentage of votes needed to
									execute trades
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-3">
							<div className="bg-blue-100 rounded-full p-2">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800">
									Real-time Communication
								</h4>
								<p className="text-gray-600">
									Chat with vault members and discuss
									strategies
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-3">
							<div className="bg-purple-100 rounded-full p-2">
								<svg
									className="w-5 h-5 text-purple-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800">
									Transparent Fund Management
								</h4>
								<p className="text-gray-600">
									All transactions are recorded and visible to
									vault members
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
					<h3 className="text-2xl font-semibold text-gray-800 mb-6">
						Sample Vault Dashboard
					</h3>

					<div className="space-y-4">
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex justify-between items-center mb-2">
								<span className="font-medium text-gray-700">
									Total Pool Value
								</span>
								<span className="text-xl font-bold text-green-600">
									$147,250
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full"
									style={{ width: "73%" }}
								></div>
							</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="font-medium text-gray-700 mb-3">
								Active Proposal
							</h4>
							<p className="text-sm text-gray-600 mb-2">
								Buy 2 ETH at current market price
							</p>
							<div className="flex justify-between text-sm">
								<span>Votes: 7/10</span>
								<span className="text-green-600">
									70% Approval
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="bg-gray-50 rounded-lg p-3 text-center">
								<div className="text-lg font-bold text-gray-800">
									12
								</div>
								<div className="text-sm text-gray-600">
									Members
								</div>
							</div>
							<div className="bg-gray-50 rounded-lg p-3 text-center">
								<div className="text-lg font-bold text-gray-800">
									85%
								</div>
								<div className="text-sm text-gray-600">
									Vote Threshold
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VaultShowcase;
