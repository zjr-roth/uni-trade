"use client";

import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AuthProvider } from "@/contexts/AuthContext";

import { config } from "./wagmiConfig";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider>{children}</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</AuthProvider>
	);
}
