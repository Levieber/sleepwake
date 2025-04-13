"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useSleep } from "@/modules/sleep/contexts/sleep.context";
import { formatDate } from "@/modules/sleep/utils/time";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useMemo } from "react";

export default function SleepHistory() {
	const { entries, setSelectedDate, deleteEntry } = useSleep();

	const sortedEntries = useMemo(() => {
		const clonedEntries = [...entries];

		return clonedEntries.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
	}, [entries]);

	const handleSelectDate = (date: string) => {
		setSelectedDate(date);
		// Scroll to top to show the form with the selected date
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (sortedEntries.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">No sleep entries recorded yet.</p>
				<p className="text-sm">
					Start tracking your sleep by adding your first entry above!
				</p>
			</div>
		);
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Date</TableHead>
						<TableHead>Bed Time</TableHead>
						<TableHead>Wake Up</TableHead>
						<TableHead className="hidden md:table-cell">Notes</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedEntries.map((entry) => (
						<TableRow key={entry.id}>
							<TableCell>{formatDate(entry.date)}</TableCell>
							<TableCell>{entry.bedTime}</TableCell>
							<TableCell>{entry.wakeUpTime}</TableCell>
							<TableCell className="hidden md:table-cell max-w-xs truncate">
								{entry.notes || "—"}
							</TableCell>
							<TableCell className="text-right">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleSelectDate(entry.date)}
								>
									<CalendarIcon className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => deleteEntry(entry.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
