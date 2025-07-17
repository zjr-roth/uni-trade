"use client";

import React from "react";

export interface PasswordRequirement {
	id: string;
	text: string;
	validator: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
	{
		id: "minLength",
		text: "At least 8 characters",
		validator: (password) => password.length >= 8,
	},
	{
		id: "uppercase",
		text: "One uppercase letter (A-Z)",
		validator: (password) => /[A-Z]/.test(password),
	},
	{
		id: "lowercase",
		text: "One lowercase letter (a-z)",
		validator: (password) => /[a-z]/.test(password),
	},
	{
		id: "number",
		text: "One number (0-9)",
		validator: (password) => /\d/.test(password),
	},
	{
		id: "special",
		text: "One special character (!@#$%^&*)",
		validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
	},
];

interface PasswordValidatorProps {
	password: string;
	className?: string;
}

export function PasswordValidator({
	password,
	className = "",
}: PasswordValidatorProps) {
	const validation = passwordRequirements.map((req) => ({
		...req,
		isValid: req.validator(password),
	}));

	const validCount = validation.filter((req) => req.isValid).length;
	const isAllValid = validation.every((req) => req.isValid);

	const getStrengthColor = () => {
		if (validCount <= 2) return "bg-red-500";
		if (validCount <= 3) return "bg-yellow-500";
		if (validCount <= 4) return "bg-blue-500";
		return "bg-green-500";
	};

	const getStrengthText = () => {
		if (validCount <= 2) return "Weak";
		if (validCount <= 3) return "Fair";
		if (validCount <= 4) return "Good";
		return "Strong";
	};

	if (password.length === 0) return null;

	return (
		<div className={`mt-3 p-3 bg-gray-50 rounded-lg border ${className}`}>
			<div className="flex items-center justify-between mb-2">
				<span className="text-xs font-medium text-gray-700">
					Password Strength
				</span>
				<span className="text-xs font-medium">
					<span
						className={`${
							validCount <= 2
								? "text-red-600"
								: validCount <= 3
								? "text-yellow-600"
								: validCount <= 4
								? "text-blue-600"
								: "text-green-600"
						}`}
					>
						{getStrengthText()}
					</span>
				</span>
			</div>

			{/* Strength bar */}
			<div className="mb-3">
				<div className="w-full bg-gray-200 rounded-full h-1.5">
					<div
						className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
						style={{
							width: `${
								(validCount / passwordRequirements.length) * 100
							}%`,
						}}
					/>
				</div>
			</div>

			<div className="space-y-1">
				{validation.map((req) => (
					<div
						key={req.id}
						className="flex items-center space-x-2 text-xs"
					>
						{req.isValid ? (
							<div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
								<svg
									className="w-2 h-2 text-white"
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
						) : (
							<div className="w-3 h-3 rounded-full border border-gray-300" />
						)}
						<span
							className={
								req.isValid ? "text-green-700" : "text-gray-600"
							}
						>
							{req.text}
						</span>
					</div>
				))}
			</div>

			{isAllValid && (
				<div className="mt-2 flex items-center text-green-600 text-xs font-medium">
					<div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mr-2">
						<svg
							className="w-3 h-3 text-white"
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
					Password meets all requirements!
				</div>
			)}
		</div>
	);
}

export function validatePassword(password: string): boolean {
	return passwordRequirements.every((req) => req.validator(password));
}
