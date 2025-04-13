import type { Metadata } from "next";
import ThemeProvider from "@/components/theme-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Sleep Wake Notes",
	description: "An application to help you track your sleep and wake times.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
