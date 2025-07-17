"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

interface FormErrors {
	email?: string;
	password?: string;
	fullName?: string;
	username?: string;
	confirmPassword?: string;
	general?: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	emailVerificationSent: boolean;
	errors: FormErrors;
	clearErrors: () => void;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (
		email: string,
		password: string,
		fullName: string,
		username: string
	) => Promise<void>;
	signOut: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [emailVerificationSent, setEmailVerificationSent] =
		useState<boolean>(false);
	const [errors, setErrors] = useState<FormErrors>({});

	useEffect(() => {
		console.log("AuthProvider: Setting up auth state listener");

		// Get initial session
		const getInitialSession = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();
				if (session?.user) {
					setUser(session.user);
				}
			} catch (error) {
				console.error("Error getting initial session:", error);
			} finally {
				setLoading(false);
			}
		};

		getInitialSession();

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log("Auth state changed:", event, session?.user?.email);
			setUser(session?.user || null);
			setLoading(false);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const clearErrors = () => {
		setErrors({});
	};

	const setFieldError = (field: keyof FormErrors, message: string) => {
		setErrors((prev) => ({ ...prev, [field]: message }));
	};

	const signUp = async (
		email: string,
		password: string,
		fullName: string,
		username: string
	) => {
		console.log("signUp: Attempting signup for:", email);
		setLoading(true);
		clearErrors();

		try {
			// First check if username is already taken
			const { data: existingUser } = await supabase
				.from("users")
				.select("username")
				.eq("username", username)
				.single();

			if (existingUser) {
				setFieldError("username", "Username is already taken");
				setLoading(false);
				return;
			}

			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName,
						username: username,
					},
				},
			});

			if (error) {
				if (error.message.includes("already registered")) {
					setFieldError(
						"email",
						"An account with this email already exists"
					);
				} else if (error.message.includes("weak password")) {
					setFieldError("password", "Password is too weak");
				} else if (error.message.includes("Invalid email")) {
					setFieldError(
						"email",
						"Please enter a valid email address"
					);
				} else {
					setFieldError("general", error.message);
				}
				setLoading(false);
				return;
			}

			if (data.user && !data.session) {
				// User needs to verify email
				setEmailVerificationSent(true);
			}

			setLoading(false);
		} catch (error: any) {
			console.error("signUp: Error:", error);
			setFieldError("general", "An unexpected error occurred");
			setLoading(false);
		}
	};

	const signIn = async (email: string, password: string) => {
		console.log("signIn: Attempting signin for:", email);
		setLoading(true);
		clearErrors();

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				if (error.message.includes("Invalid login credentials")) {
					setFieldError("general", "Invalid email or password");
				} else if (error.message.includes("Email not confirmed")) {
					setFieldError(
						"email",
						"Please verify your email before signing in"
					);
				} else if (error.message.includes("Too many requests")) {
					setFieldError(
						"general",
						"Too many login attempts. Please wait and try again"
					);
				} else {
					setFieldError("general", error.message);
				}
				setLoading(false);
				return;
			}

			// Sign in successful, auth state change will handle user setting
			setLoading(false);
		} catch (error: any) {
			console.error("signIn: Error:", error);
			setFieldError("general", "An unexpected error occurred");
			setLoading(false);
		}
	};

	const signOut = async () => {
		console.log("signOut: Signing out user");
		setLoading(true);
		clearErrors();

		try {
			await supabase.auth.signOut();
		} catch (error) {
			console.error("signOut: Error:", error);
		}

		setUser(null);
		setLoading(false);
	};

	const resetPassword = async (email: string) => {
		clearErrors();
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			});

			if (error) {
				if (
					error.message.includes("email") ||
					error.message.includes("not found")
				) {
					setFieldError(
						"email",
						"No account found with this email address"
					);
				} else {
					setFieldError("general", error.message);
				}
				throw error;
			}
		} catch (error) {
			throw error;
		}
	};

	const value = {
		user,
		loading,
		emailVerificationSent,
		errors,
		clearErrors,
		signIn,
		signUp,
		signOut,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
