import React from "react";

const Hero = () => {
	return (
		<div className="max-w-4xl mx-auto text-center">
			<div className="flex flex-col text-black mb-8">
				<h1 className="text-5xl md:text-6xl font-bold mb-4">
					Welcome to{" "}
					<span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
						UniTrade
					</span>
				</h1>
				<p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
					The ultimate multi-trading platform. Trade solo or join
					forces with others in collaborative trading vaults.
				</p>
			</div>

			<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Ready to revolutionize your trading?
				</h2>
				<p className="text-gray-600 mb-6">
					Connect your crypto wallet and start trading individually or
					create vaults with other traders to pool resources and make
					collective decisions.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<a href="/auth/signup">
						<button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
							🔗 Connect Wallet & Sign Up
						</button>
					</a>
					<button className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
						Learn More
					</button>
				</div>

				<p className="text-gray-500 text-sm mt-4">
					Already have an account?{" "}
					<a
						href="/auth/login"
						className="text-blue-600 hover:underline font-medium"
					>
						Log in here
					</a>
				</p>
			</div>
		</div>
	);
};

export default Hero;
