"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSleep } from "@/modules/sleep/contexts/sleep.context";
import {
	calculateSleepDuration,
	calculateWeeklyAverage,
} from "@/modules/sleep/utils/sleep";
import { Clock, Moon, Sun } from "lucide-react";

export default function SleepStats() {
	const { entries, selectedDate } = useSleep();

	const currentEntry = entries.find((entry) => entry.date === selectedDate);

	const sleepDuration = calculateSleepDuration(currentEntry);

	const weeklyAverage = calculateWeeklyAverage(entries);

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Bed Time</CardTitle>
					<Moon className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{currentEntry?.bedTime ?? "--"}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Wake Up Time</CardTitle>
					<Sun className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{currentEntry?.wakeUpTime ?? "--"}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Sleep Duration</CardTitle>
					<Clock className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{sleepDuration
							? `${sleepDuration.hours}h ${sleepDuration.minutes}m`
							: "--"}
					</div>
					<p className="text-xs mt-1">
						Weekly Avg:{" "}
						{weeklyAverage
							? `${weeklyAverage.hours}h ${weeklyAverage.minutes}m`
							: "--"}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
