import type { SleepEntry } from "@/modules/sleep/types/sleep-entry";
import { from12Hours } from "@/modules/sleep/utils/time";
import { differenceInMinutes } from "date-fns";

/**
 * Calculate sleep duration for the entry
 * @param currentEntry - The sleep entry
 */
export function calculateSleepDuration(currentEntry?: SleepEntry) {
	if (!currentEntry) return null;

	const { bedTime, wakeUpTime } = currentEntry;

	const bedDateTime = from12Hours(bedTime);
	let wakeDateTime = from12Hours(wakeUpTime);

	if (wakeDateTime < bedDateTime) {
		wakeDateTime = new Date(wakeDateTime.setDate(wakeDateTime.getDate() + 1));
	}

	const sleepMinutes = differenceInMinutes(wakeDateTime, bedDateTime);

	const hours = Math.floor(sleepMinutes / 60);
	const minutes = sleepMinutes % 60;

	return { hours, minutes };
}

/**
 * Calculate the average sleep duration for the last 7 days
 * @param entries - Array of sleep entries
 */
export function calculateWeeklyAverage(entries: SleepEntry[]) {
	const last7Days = entries
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 7);

	if (last7Days.length === 0) return null;

	let totalMinutes = 0;
	let count = 0;

	for (const entry of last7Days) {
		const bedDateTime = from12Hours(entry.bedTime);
		let wakeDateTime = from12Hours(entry.wakeUpTime);

		if (wakeDateTime < bedDateTime) {
			wakeDateTime = new Date(wakeDateTime.setDate(wakeDateTime.getDate() + 1));
		}

		const sleepMinutes = differenceInMinutes(wakeDateTime, bedDateTime);
		totalMinutes += sleepMinutes;
		count++;
	}

	if (count === 0) return null;

	const avgMinutes = totalMinutes / count;
	const hours = Math.floor(avgMinutes / 60);
	const minutes = Math.round(avgMinutes % 60);

	return { hours, minutes };
}
