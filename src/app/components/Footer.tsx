import React from "react";

const Footer = () => {
	return (
		<div>
			<footer className="bg-gray-800 mt-auto text-white py-12 px-4">
				<div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
							UniTrade
						</h3>
						<p className="text-gray-400 text-sm">
							The future of collaborative cryptocurrency trading.
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Platform</h4>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<a href="#" className="hover:text-white">
									Individual Trading
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Trading Vaults
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Analytics
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Support</h4>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<a href="#" className="hover:text-white">
									Help Center
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Contact Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Documentation
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Legal</h4>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>
								<a href="#" className="hover:text-white">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Terms of Service
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white">
									Security
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} UniTrade. All rights
						reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
