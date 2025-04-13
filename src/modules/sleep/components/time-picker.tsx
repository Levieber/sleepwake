"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { timeMask, to12Hours } from "@/modules/sleep/utils/time";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useMaskito } from "@maskito/react";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  className?: string;
}

const hoursOptions = Array.from({ length: 12 }, (_, i) => i + 1);
const minutesOptions = Array.from({ length: 60 }, (_, i) => i);
const amPmOptions = ["AM", "PM"];

export default function TimePicker({
  value,
  onChange,
  label = "Select time",
  className,
}: TimePickerProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const maskedInputRef = useMaskito({ options: timeMask });

  useEffect(() => {
    // Parse the initial value into a Date object
    if (value) {
      const [time, period] = value.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(period === "PM" ? (hours % 12) + 12 : hours % 12);
      date.setMinutes(minutes);
      setDate(date);
    }
  }, [value]);

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    newValue: string,
  ) => {
    if (!date) return;

    const newDate = new Date(date);
    if (type === "hour") {
      newDate.setHours(
        (Number.parseInt(newValue) % 12) + (newDate.getHours() >= 12 ? 12 : 0),
      );
    } else if (type === "minute") {
      newDate.setMinutes(Number.parseInt(newValue));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      newDate.setHours(
        newValue === "PM"
          ? currentHours < 12
            ? currentHours + 12
            : currentHours
          : currentHours >= 12
          ? currentHours - 12
          : currentHours,
      );
    }
    setDate(newDate);
    onChange(to12Hours(newDate));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
          onClick={() => setIsOpen(true)}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? value : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-2">
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            ref={maskedInputRef}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {hoursOptions.map((hour) => (
                <Button
                  key={hour}
                  size="icon"
                  variant={
                    date && date.getHours() % 12 === hour % 12
                      ? "default"
                      : "ghost"
                  }
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("hour", hour.toString())}
                >
                  {hour}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {minutesOptions.map((minute) => (
                <Button
                  key={minute}
                  size="icon"
                  variant={
                    date && date.getMinutes() === minute ? "default" : "ghost"
                  }
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("minute", minute.toString())}
                >
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {amPmOptions.map((ampm) => (
                <Button
                  key={ampm}
                  size="icon"
                  variant={
                    date &&
                    ((ampm === "AM" && date.getHours() < 12) ||
                      (ampm === "PM" && date.getHours() >= 12))
                      ? "default"
                      : "ghost"
                  }
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("ampm", ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
