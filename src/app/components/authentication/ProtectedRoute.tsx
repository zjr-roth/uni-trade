"use client";

import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { AuthPage } from "./AuthPage";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user, loading } = useAuth();

	// Show loading while checking auth state
	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex items-center justify-center">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
					<p className="text-gray-600">Checking authentication...</p>
				</div>
			</div>
		);
	}

	// If no user after loading is complete, show auth page
	if (!user) {
		return <AuthPage />;
	}

	// User is authenticated, show protected content
	return <>{children}</>;
}
