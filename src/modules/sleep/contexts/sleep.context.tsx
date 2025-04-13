"use client";

import type { SleepEntry } from "@/modules/sleep/types/sleep-entry";
import {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";

interface SleepContextType {
	entries: SleepEntry[];
	addEntry: (entry: Omit<SleepEntry, "id">) => void;
	updateEntry: (id: string, entry: Partial<SleepEntry>) => void;
	deleteEntry: (id: string) => void;
	getEntryByDate: (date: string) => SleepEntry | undefined;
	selectedDate: string;
	setSelectedDate: (date: string) => void;
}

const SleepContext = createContext<SleepContextType | undefined>(undefined);

export const useSleep = () => {
	const context = useContext(SleepContext);

	if (!context) {
		throw new Error("useSleep must be used within a SleepProvider");
	}

	return context;
};

interface SleepProviderProps {
	children: React.ReactNode;
}

export default function SleepProvider({ children }: SleepProviderProps) {
	const [entries, setEntries] = useState<SleepEntry[]>([]);

	const today = new Date().toISOString().split("T")[0];
	const [selectedDate, setSelectedDate] = useState<string>(today);

	useEffect(() => {
		const savedEntries = localStorage.getItem("sleepEntries");

		setEntries(savedEntries ? JSON.parse(savedEntries) : []);
	}, []);

	useEffect(() => {
		localStorage.setItem("sleepEntries", JSON.stringify(entries));
	}, [entries]);

	const addEntry = useCallback((entry: Omit<SleepEntry, "id">) => {
		const newEntry = {
			...entry,
			id: Date.now().toString(),
		};

		setEntries((entries) => [...entries, newEntry]);
	}, []);

	const updateEntry = useCallback(
		(id: string, updatedData: Partial<SleepEntry>) => {
			setEntries((entries) =>
				entries.map((entry) =>
					entry.id === id ? { ...entry, ...updatedData } : entry,
				),
			);
		},
		[],
	);

	const deleteEntry = useCallback((id: string) => {
		setEntries((entries) => entries.filter((entry) => entry.id !== id));
	}, []);

	const getEntryByDate = useCallback(
		(date: string) => entries.find((entry) => entry.date === date),
		[entries],
	);

	return (
		<SleepContext.Provider
			value={{
				entries,
				addEntry,
				updateEntry,
				deleteEntry,
				getEntryByDate,
				selectedDate,
				setSelectedDate,
			}}
		>
			{children}
		</SleepContext.Provider>
	);
}
