"use client";

import TimePicker from "@/modules/sleep/components/time-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Moon, Sun } from "lucide-react";
import { useSleepEntryForm } from "@/modules/sleep/hooks/sleep-entry-form.hook";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/field";

export default function SleepEntryForm() {
	const { form, handleSaveSleepEntry } = useSleepEntryForm();

	const currentDate = form.watch("date");

	return (
		<Form {...form}>
			<form onSubmit={handleSaveSleepEntry}>
				<Card className="w-full max-w-md mx-auto">
					<CardHeader>
						<CardTitle className="text-center">Sleep Entry</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-2">
							<label htmlFor="date" className="text-sm font-medium">
								Select Date
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full justify-start text-left font-normal",
											!currentDate && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{currentDate
											? format(currentDate, "MMMM d, yyyy")
											: "Select date"}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Field
										control={form.control}
										name="date"
										render={({ field }) => (
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={(date) => date && field.onChange(date)}
												initialFocus
												id="date"
												className="p-3 pointer-events-auto"
											/>
										)}
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="grid gap-2">
							<label
								htmlFor="bed-time"
								className="text-sm font-medium flex items-center"
							>
								<Moon className="mr-2 h-4 w-4" />
								Bed Time
							</label>
							<Field
								control={form.control}
								name="bedTime"
								render={({ field }) => (
									<TimePicker label="Select bed time" {...field} />
								)}
							/>
						</div>

						<div className="grid gap-2">
							<label
								htmlFor="wake-up-time"
								className="text-sm font-medium flex items-center"
							>
								<Sun className="mr-2 h-4 w-4" />
								Wake Up Time
							</label>
							<Field
								control={form.control}
								name="wakeUpTime"
								render={({ field }) => (
									<TimePicker label="Select wake up time" {...field} />
								)}
							/>
						</div>

						<div className="grid gap-2">
							<label htmlFor="notes" className="text-sm font-medium">
								Notes
							</label>
							<Field
								control={form.control}
								name="notes"
								render={({ field }) => (
									<Textarea
										id="notes"
										placeholder="How did you sleep? Any dreams or disruptions?"
										className="min-h-[100px]"
										{...field}
									/>
								)}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full" type="submit">
							Save Sleep Entry
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
