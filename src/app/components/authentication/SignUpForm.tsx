"use client";

import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { PasswordValidator, validatePassword } from "./PasswordValidation";
import { EmailVerificationAlert } from "./EmailVerificationAlert";

interface SignUpFormProps {
	onToggleMode: () => void;
}

export function SignUpForm({ onToggleMode }: SignUpFormProps) {
	const { signUp, loading, errors, clearErrors } = useAuth();
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [localErrors, setLocalErrors] = useState<{
		confirmPassword?: string;
		password?: string;
		fullName?: string;
		username?: string;
		email?: string;
	}>({});
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Clear both context and local errors
		clearErrors();
		setLocalErrors({});

		// Client-side validation
		let hasValidationErrors = false;

		if (formData.fullName.trim().length < 2) {
			setLocalErrors((prev) => ({
				...prev,
				fullName: "Full name must be at least 2 characters",
			}));
			hasValidationErrors = true;
		}

		if (formData.username.trim().length < 3) {
			setLocalErrors((prev) => ({
				...prev,
				username: "Username must be at least 3 characters",
			}));
			hasValidationErrors = true;
		}

		if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
			setLocalErrors((prev) => ({
				...prev,
				username:
					"Username can only contain letters, numbers, and underscores",
			}));
			hasValidationErrors = true;
		}

		if (!validatePassword(formData.password)) {
			setLocalErrors((prev) => ({
				...prev,
				password: "Password does not meet all requirements",
			}));
			hasValidationErrors = true;
		}

		if (formData.password !== formData.confirmPassword) {
			setLocalErrors((prev) => ({
				...prev,
				confirmPassword: "Passwords do not match",
			}));
			hasValidationErrors = true;
		}

		if (hasValidationErrors) {
			return;
		}

		try {
			await signUp(
				formData.email,
				formData.password,
				formData.fullName,
				formData.username
			);
		} catch (error: any) {
			// Errors are handled in the AuthContext
		}
		setEmailSent(true);
	};

	if (emailSent) {
		return (
			<EmailVerificationAlert
				email={formData.email}
				onBackToSignIn={() => {}}
			/>
		);
	}

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		// Clear context errors for the field being edited
		if (errors[field as keyof typeof errors]) {
			clearErrors();
		}

		// Clear local errors for the field being edited
		if (localErrors[field as keyof typeof localErrors]) {
			setLocalErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	// Combine context errors with local validation errors
	const getFieldError = (field: string) => {
		return (
			errors[field as keyof typeof errors] ||
			localErrors[field as keyof typeof localErrors]
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
						UniTrade
					</h1>
					<h2 className="text-2xl font-semibold text-gray-800 mb-2">
						Create Account
					</h2>
					<p className="text-gray-600">
						Join the future of collaborative trading
					</p>
				</div>

				{errors.general && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
						<div className="flex items-start space-x-2">
							<svg
								className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
							<p className="text-sm text-red-800">
								{errors.general}
							</p>
						</div>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Full Name */}
					<div>
						<label
							htmlFor="fullName"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Full Name
						</label>
						<input
							id="fullName"
							type="text"
							placeholder="Enter your full name"
							value={formData.fullName}
							onChange={(e) =>
								handleInputChange("fullName", e.target.value)
							}
							className={`w-full text-black placeholder:text-gray-400 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
								getFieldError("fullName")
									? "border-red-500"
									: "border-gray-300"
							}`}
							required
						/>
						{getFieldError("fullName") && (
							<p className="mt-1 text-sm text-red-600">
								{getFieldError("fullName")}
							</p>
						)}
					</div>

					{/* Username */}
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							placeholder="Choose a username"
							value={formData.username}
							onChange={(e) =>
								handleInputChange("username", e.target.value)
							}
							className={`w-full text-black placeholder:text-gray-400 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
								getFieldError("username")
									? "border-red-500"
									: "border-gray-300"
							}`}
							required
						/>
						{getFieldError("username") && (
							<p className="mt-1 text-sm text-red-600">
								{getFieldError("username")}
							</p>
						)}
					</div>

					{/* Email */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="Enter your email"
							value={formData.email}
							onChange={(e) =>
								handleInputChange("email", e.target.value)
							}
							className={`w-full text-black placeholder:text-gray-400 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
								getFieldError("email")
									? "border-red-500"
									: "border-gray-300"
							}`}
							required
						/>
						{getFieldError("email") && (
							<p className="mt-1 text-sm text-red-600">
								{getFieldError("email")}
							</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Create a password"
								value={formData.password}
								onChange={(e) =>
									handleInputChange(
										"password",
										e.target.value
									)
								}
								className={`w-full text-black placeholder:text-gray-400 px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
									getFieldError("password")
										? "border-red-500"
										: "border-gray-300"
								}`}
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
										/>
									</svg>
								) : (
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								)}
							</button>
						</div>
						{getFieldError("password") && (
							<p className="mt-1 text-sm text-red-600">
								{getFieldError("password")}
							</p>
						)}
						<PasswordValidator password={formData.password} />
					</div>

					{/* Confirm Password */}
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Confirm Password
						</label>
						<div className="relative">
							<input
								id="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirm your password"
								value={formData.confirmPassword}
								onChange={(e) =>
									handleInputChange(
										"confirmPassword",
										e.target.value
									)
								}
								className={`w-full text-black placeholder:text-gray-400 px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
									getFieldError("confirmPassword")
										? "border-red-500"
										: "border-gray-300"
								}`}
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
								}
							>
								{showConfirmPassword ? (
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
										/>
									</svg>
								) : (
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								)}
							</button>
						</div>
						{getFieldError("confirmPassword") && (
							<p className="mt-1 text-sm text-red-600">
								{getFieldError("confirmPassword")}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					>
						{loading ? (
							<div className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
								Creating Account...
							</div>
						) : (
							"Create Account"
						)}
					</button>

					<div className="text-center text-sm">
						<span className="text-gray-600">
							Already have an account?{" "}
						</span>
						<button
							type="button"
							onClick={onToggleMode}
							className="text-blue-600 hover:underline font-medium"
						>
							Sign in here
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
