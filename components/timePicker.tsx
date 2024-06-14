"use client";

import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { TimePickerInput } from "./ui/timePickerInput";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-1">
        <Label htmlFor="hours">hours</Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="minutes">minutes</Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
    </div>
  );
}
