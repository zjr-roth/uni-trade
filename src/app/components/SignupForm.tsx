import React, { useState } from "react";

const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!username || !email || !password) {
			setError("All fields are required");
			return;
		}
		// Handle signup logic here
		console.log("User signed up:", { username, email, password });
		// Reset form fields
		setUsername("");
		setEmail("");
		setPassword("");
		setError("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<button type="submit">Sign Up</button>
		</form>
	);
};

export default SignupForm;
