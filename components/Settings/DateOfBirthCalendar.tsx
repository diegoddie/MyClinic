"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  value?: Date | undefined;
  onChange?: (date: Date) => void;
}

export function DateOfBirthCalendar({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  value,
  onChange,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value || new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date || new Date(), months.indexOf(month));
    setDate(newDate);
    onChange?.(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date || new Date(), parseInt(year));
    setDate(newDate);
    onChange?.(newDate);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const day = selectedDate.getDate();
      
      const fixedDate = new Date(year, month, day, 12, 0, 0);

      setDate(fixedDate);
      onChange?.(fixedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal dark:bg-[#09090b] bg-white relative",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <span className="pl-4">
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          </span>
          
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date || new Date())]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date || new Date()).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          fixedWeeks
          selected={date}
          onSelect={handleSelect}
          initialFocus
          month={date || new Date()}
          onMonthChange={(newDate) => setDate(newDate)}
        />
      </PopoverContent>
    </Popover>
  );
}
