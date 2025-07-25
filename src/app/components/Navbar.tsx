export default function Navbar() {
	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-20">
					<div className="flex-1 flex items-center justify-start">
						<a
							href="/"
							className="text-lg font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
						>
							UniTrade
						</a>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<a
								href="/auth/login"
								className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								Login
							</a>
							<a
								href="/auth/signup"
								className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
							>
								Sign Up
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
