
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Download, FileText, FileSpreadsheet } from "lucide-react";
import { DateRange } from "react-day-picker";
import { subDays, format } from "date-fns";
import { cn } from "@/lib/utils";

type StatementControlsProps = {
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
}

export function StatementControls({ dateRange, setDateRange }: StatementControlsProps) {

    const handlePredefinedRange = (value: string) => {
        const now = new Date();
        switch (value) {
            case "7d":
                setDateRange({ from: subDays(now, 6), to: now });
                break;
            case "1m":
                setDateRange({ from: subDays(now, 29), to: now });
                break;
            case "3m":
                setDateRange({ from: subDays(now, 89), to: now });
                break;
            default:
                break;
        }
    }
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 border rounded-lg">
        <div className="flex gap-2 items-center flex-wrap">
            <Select onValueChange={handlePredefinedRange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="1m">Last 1 Month</SelectItem>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                </SelectContent>
            </Select>

             <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(dateRange.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>

        <div className="flex gap-2">
            <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Download PDF</Button>
            <Button variant="outline"><FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel</Button>
        </div>
    </div>
  );
}
