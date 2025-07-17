"use client";

import { SignInForm } from "@/app/components/authentication/SignInForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();

	const handleToggleMode = () => {
		router.push("/auth/signup");
	};

	return <SignInForm onToggleMode={handleToggleMode} />;
}
