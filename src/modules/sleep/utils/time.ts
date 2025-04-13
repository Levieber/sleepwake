import { format, parse, parseISO } from "date-fns";
import type { MaskitoOptions } from "@maskito/core";
import { maskitoUpdateElement } from "@maskito/core";
import {
	maskitoEventHandler,
	maskitoSelectionChangeHandler,
	maskitoTimeOptionsGenerator,
} from "@maskito/kit";

const dateFormatString = "yyyy-MM-dd";
const timeFormatString12 = "hh:mm a";

const timeOptions = maskitoTimeOptionsGenerator({
	mode: "HH:MM AA",
	timeSegmentMaxValues: { hours: 12 },
	timeSegmentMinValues: { hours: 1 },
});

export const timeMask = {
	...timeOptions,
	plugins: [
		...timeOptions.plugins,
		maskitoSelectionChangeHandler((element) => {
			element.inputMode =
				(element.selectionStart as number) >= "HH:MM".length
					? "text"
					: "numeric";
		}),
		maskitoEventHandler("blur", (element) => {
			if (
				element.value.length >= "HH:MM".length &&
				!element.value.endsWith("M")
			) {
				maskitoUpdateElement(element, `${element.value} AM`);
			}
		}),
	],
} satisfies MaskitoOptions;

/**
 * Format a ISO date string to a date string in the format `MMM d, yyyy`
 * @param date - A Date object
 */
export function formatDate(date: string): string {
	return format(parseISO(date), "MMM d, yyyy");
}

/**
 * Check if a time string is in the format hh:mm or hh:mm AM/PM
 * @param timeString - A time string in the format hh:mm or hh:mm AM/PM
 * @returns
 */
export function isValidTimeString(timeString: string): boolean {
	const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9])(\s[AaPp][Mm])?$/;
	return timeRegex.test(timeString);
}

/**
 * Convert a date to a time string in the format `hh:mm a` of `date-fns`
 * @param date - A Date object
 */
export function to12Hours(date: Date): string {
	const timeString = format(date, timeFormatString12);
	return timeString;
}

/**
 * Convert a 12 hour time string to a Date object
 * @param timeString - A time string in the format `hh:mm a` of `date-fns`
 */
export function from12Hours(timeString: string): Date {
	const date = parse(timeString, timeFormatString12, new Date());
	return date;
}

/**
 * Convert a date to a string in the format yyyy-MM-dd of `date-fns`
 * @param date - A Date object
 */
export function toDateString(date: Date): string {
	const dateString = format(date, dateFormatString);
	return dateString;
}

/**
 * Convert a date string to a Date object
 * @param dateString - A date string in the format yyyy-MM-dd
 */
export function fromDateString(dateString: string): Date {
	const date = parse(dateString, dateFormatString, new Date());
	return date;
}
