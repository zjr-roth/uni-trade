import React from "react";

const CTA = () => {
	return (
		<div className="max-w-4xl mx-auto text-center">
			<div className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 rounded-2xl p-12 text-white shadow-2xl">
				<h2 className="text-4xl font-bold mb-4">
					Ready to Transform Your Trading?
				</h2>
				<p className="text-xl mb-8 opacity-90">
					Join thousands of traders who are already using UniTrade to
					maximize their potential through collaboration.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<button className="bg-white text-gray-800 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
						🚀 Get Started Now
					</button>
					<button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-gray-800 transition-all duration-300">
						View Demo
					</button>
				</div>

				<div className="mt-8 text-sm opacity-75">
					<p>
						✓ No hidden fees ✓ Secure wallet integration ✓ 24/7
						support
					</p>
				</div>
			</div>
		</div>
	);
};

export default CTA;
