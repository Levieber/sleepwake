import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
	children,
}: { children: React.ReactNode }) {
	return (
		<NextThemesProvider
			defaultTheme="system"
			enableColorScheme
			enableSystem
			attribute="class"
			themes={["light", "dark", "morning", "afternoon", "night"]}
		>
			{children}
		</NextThemesProvider>
	);
}
