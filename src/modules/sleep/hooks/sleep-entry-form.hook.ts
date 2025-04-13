import { useSleep } from "@/modules/sleep/contexts/sleep.context";
import {
	fromDateString,
	isValidTimeString,
	toDateString,
} from "@/modules/sleep/utils/time";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const sleepEntrySchema = z.object({
	date: z.coerce.date(),
	bedTime: z.string().refine(isValidTimeString, {
		message: "Invalid time format. Use HH:mm.",
	}),
	wakeUpTime: z.string().refine(isValidTimeString, {
		message: "Invalid time format. Use HH:mm.",
	}),
	notes: z.string(),
});

type SleepEntryValues = z.infer<typeof sleepEntrySchema>;

export function useSleepEntryForm() {
	const {
		selectedDate,
		setSelectedDate,
		getEntryByDate,
		addEntry,
		updateEntry,
	} = useSleep();

	const existingEntry = getEntryByDate(selectedDate);

	const form = useForm<SleepEntryValues>({
		resolver: zodResolver(sleepEntrySchema),
		values: {
			date: selectedDate ? fromDateString(selectedDate) : new Date(),
			bedTime: existingEntry?.bedTime ?? "10:00 PM",
			wakeUpTime: existingEntry?.wakeUpTime ?? "07:00 AM",
			notes: existingEntry?.notes ?? "",
		},
	});

	const currentDate = form.watch("date");

	useEffect(() => {
		if (!currentDate) {
			return;
		}

		const dateString = toDateString(currentDate);

		setSelectedDate(dateString);

		const existingEntry = getEntryByDate(dateString);

		if (!existingEntry) {
			form.reset(
				{
					bedTime: "10:00 PM",
					wakeUpTime: "07:00 AM",
					notes: "",
				},
				{
					keepValues: true,
				},
			);
		}
	}, [currentDate, form, getEntryByDate, setSelectedDate]);

	const handleSaveSleepEntry = (data: SleepEntryValues) => {
		const dateString = toDateString(data.date);
		const existingEntry = getEntryByDate(dateString);

		const sleepEntryDateFormatString = "MMMM d, yyyy";

		if (existingEntry) {
			updateEntry(existingEntry.id, {
				...data,
				date: dateString,
			});

			toast("Sleep entry updated", {
				description: `Your sleep data for ${format(data.date, sleepEntryDateFormatString)} has been updated.`,
			});
		} else {
			addEntry({ ...data, date: dateString, quality: null });

			toast("Sleep entry saved", {
				description: `Your sleep data for ${format(data.date, sleepEntryDateFormatString)} has been recorded.`,
			});
		}
	};

	return {
		form,
		handleSaveSleepEntry: form.handleSubmit(handleSaveSleepEntry),
	};
}
