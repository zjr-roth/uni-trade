"use client";

import React, { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { EmailVerificationAlert } from "./EmailVerificationAlert";
import { useAuth } from "../../../contexts/AuthContext";

type AuthView = "signin" | "signup";

export function AuthPage() {
	const [currentView, setCurrentView] = useState<AuthView>("signin");
	const { emailVerificationSent, signUp } = useAuth();

	const toggleAuthMode = () => {
		setCurrentView(currentView === "signin" ? "signup" : "signin");
	};

	// Show email verification if signup was successful
	if (emailVerificationSent) {
		return (
			<EmailVerificationAlert
				email="" // This would need to be passed from the signup form
				onBackToSignIn={() => setCurrentView("signin")}
			/>
		);
	}

	return (
		<>
			{currentView === "signin" ? (
				<SignInForm onToggleMode={toggleAuthMode} />
			) : (
				<SignUpForm onToggleMode={toggleAuthMode} />
			)}
		</>
	);
}
