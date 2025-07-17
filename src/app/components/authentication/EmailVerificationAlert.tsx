"use client";

import React, { useState, useEffect } from "react";

interface EmailVerificationAlertProps {
	email: string;
	onResendEmail?: () => Promise<void>;
	onBackToSignIn?: () => void;
}

export function EmailVerificationAlert({
	email,
	onResendEmail,
	onBackToSignIn,
}: EmailVerificationAlertProps) {
	const [isResending, setIsResending] = useState(false);
	const [resendCooldown, setResendCooldown] = useState(0);
	const [showDeliveryTips, setShowDeliveryTips] = useState(false);

	// Start cooldown timer for resend functionality
	useEffect(() => {
		if (resendCooldown > 0) {
			const timer = setTimeout(() => {
				setResendCooldown(resendCooldown - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [resendCooldown]);

	const handleResendEmail = async () => {
		if (!onResendEmail || resendCooldown > 0) return;

		setIsResending(true);
		try {
			await onResendEmail();
			setResendCooldown(60); // 60 second cooldown
			showToast("Verification email sent!", "success");
		} catch (error) {
			console.error("Failed to resend email:", error);
			showToast("Failed to resend email. Please try again.", "error");
		} finally {
			setIsResending(false);
		}
	};

	const showToast = (message: string, type: "success" | "error") => {
		const toast = document.createElement("div");
		const bgColor =
			type === "success"
				? "bg-green-100 border-green-200 text-green-800"
				: "bg-red-100 border-red-200 text-red-800";

		toast.className = `fixed top-4 right-4 ${bgColor} border px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm`;
		toast.textContent = message;
		document.body.appendChild(toast);
		setTimeout(() => document.body.removeChild(toast), 3000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-8">
				<div className="text-center mb-8">
					<div className="flex justify-center mb-4">
						<div className="relative">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
								<svg
									className="w-4 h-4 text-white"
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
						</div>
					</div>
					<h2 className="text-2xl font-semibold text-blue-600 mb-2">
						Check Your Email!
					</h2>
					<p className="text-sm text-gray-600">
						Account created successfully
					</p>
				</div>

				<div className="space-y-6">
					{/* Main verification message */}
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<div className="flex items-start space-x-3">
							<svg
								className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="text-left">
								<p className="text-sm font-medium text-blue-800 mb-2">
									Please check your email for a verification
									link to complete your account setup
								</p>
								<p className="text-sm text-blue-700">
									We've sent a verification email to{" "}
									<span className="font-semibold">
										{email}
									</span>
									. Click the verification link in the email
									to activate your account.
								</p>
							</div>
						</div>
					</div>

					{/* Delivery delay notice */}
					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
						<div className="flex items-center space-x-2">
							<svg
								className="w-4 h-4 text-yellow-600"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
									clipRule="evenodd"
								/>
							</svg>
							<p className="text-sm text-yellow-800">
								<strong>
									Email delivery may take 1-5 minutes.
								</strong>{" "}
								Please be patient.
							</p>
						</div>
					</div>

					{/* Troubleshooting section */}
					<div className="space-y-3">
						<button
							onClick={() =>
								setShowDeliveryTips(!showDeliveryTips)
							}
							className="w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
						>
							{showDeliveryTips ? "Hide" : "Show"} email delivery
							tips
							<span className="ml-1">
								{showDeliveryTips ? "↑" : "↓"}
							</span>
						</button>

						{showDeliveryTips && (
							<div className="text-sm text-gray-600 space-y-2 bg-gray-50 rounded-lg p-3">
								<p className="font-medium">
									Can't find the email?
								</p>
								<ul className="text-xs space-y-1 ml-4">
									<li>
										• Check your spam, junk, or promotions
										folder
									</li>
									<li>
										• Make sure you entered the correct
										email address
									</li>
									<li>• Wait up to 5 minutes for delivery</li>
									<li>
										• Check if your email provider blocks
										automated emails
									</li>
								</ul>
							</div>
						)}
					</div>

					{/* Action buttons */}
					<div className="space-y-3 pt-2">
						{onResendEmail && (
							<button
								onClick={handleResendEmail}
								disabled={isResending || resendCooldown > 0}
								className="w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isResending ? (
									<div className="flex items-center justify-center">
										<svg
											className="animate-spin -ml-1 mr-3 h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Sending...
									</div>
								) : resendCooldown > 0 ? (
									<div className="flex items-center justify-center">
										<svg
											className="w-4 h-4 mr-2"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
												clipRule="evenodd"
											/>
										</svg>
										Resend in {resendCooldown}s
									</div>
								) : (
									<div className="flex items-center justify-center">
										<svg
											className="w-4 h-4 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										Resend verification email
									</div>
								)}
							</button>
						)}

						{onBackToSignIn && (
							<div className="pt-2 border-t border-gray-200">
								<button
									onClick={onBackToSignIn}
									className="w-full text-sm text-gray-600 hover:text-blue-600 transition-colors"
								>
									Already verified? Sign in here
								</button>
							</div>
						)}
					</div>

					{/* Additional help section */}
					<div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border">
						<p className="font-medium mb-1">
							Still having trouble?
						</p>
						<p>
							If you continue to experience issues, please contact
							our support team or try creating a new account with
							a different email address.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
