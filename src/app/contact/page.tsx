import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Page = () => {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="flex-1/2 py-20 px-4">
				<h1 className="text-4xl font-bold text-center ">Contact Us</h1>
				<p className="mt-4 text-center text-gray-600">
					We would love to hear from you! If you have any questions or
					feedback, please reach out to us.
				</p>
				<div className="max-w-2xl mx-auto mt-10">
					<form className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Name
							</label>
							<input
								type="text"
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus :ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Message
							</label>
							<textarea
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								required
							></textarea>
						</div>
						<div>
							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Page;
