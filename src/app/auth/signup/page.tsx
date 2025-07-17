"use client";

import { SignUpForm } from "../../components/authentication/SignUpForm";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
	const router = useRouter();

	const handleToggleMode = () => {
		router.push("/auth/login");
	};

	return <SignUpForm onToggleMode={handleToggleMode} />;
}
