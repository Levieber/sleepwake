"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import SleepEntryForm from "@/modules/sleep/components/sleep-entry-form";
import SleepHistory from "@/modules/sleep/components/sleep-history";
import SleepStats from "@/modules/sleep/components/sleep-stats";
import SleepProvider from "@/modules/sleep/contexts/sleep.context";
import { MoonStar } from "lucide-react";

export default function Home() {
	return (
		<SleepProvider>
			<div className="min-h-screen">
				<div className="container mx-auto px-4 py-8">
					<header className="mb-8 text-center">
						<div className="flex items-center justify-center mb-2 gap-2">
							<MoonStar className="h-8 w-8" />
							<h1 className="text-3xl font-bold">Sleep Wake Notes</h1>
							<ThemeToggle  />
						</div>
						<p className="text-lg">Track your sleep patterns and wake times</p>
					</header>

					<div className="grid gap-8">
						<div className="grid md:grid-cols-2 gap-8">
							<SleepEntryForm />
							<div className="space-y-8">
								<SleepStats />
								<div className="hidden md:block">
									<h2 className="text-xl font-semibold mb-4">
										Tips for Better Sleep
									</h2>
									<ul className="list-disc pl-5 space-y-2 text-sm">
										<li>Keep a consistent sleep schedule, even on weekends</li>
										<li>
											Create a restful environment (cool, dark, and quiet)
										</li>
										<li>Limit exposure to screens before bedtime</li>
										<li>Avoid caffeine and alcohol close to bedtime</li>
										<li>Exercise regularly, but not too close to bedtime</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-4">Sleep History</h2>
							<SleepHistory />
						</div>
					</div>
				</div>
			</div>
		</SleepProvider>
	);
}
