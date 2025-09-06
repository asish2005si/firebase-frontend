
"use client";

import { DateRange } from "react-day-picker";
import { format } from "date-fns";

type StatementHeaderProps = {
    customer: {
        fullName: string;
        accountNumber: string;
        accountType: string;
        branch: string;
    },
    range: DateRange | undefined;
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
    </div>
);

export function StatementHeader({ customer, range }: StatementHeaderProps) {
    const formattedDateRange = range?.from 
        ? range.to 
            ? `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
            : format(range.from, "LLL dd, y")
        : "Select a date range";

  return (
    <div className="p-6 bg-muted/50 rounded-lg border">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <DetailItem label="Customer Name" value={customer.fullName} />
            <DetailItem label="Account Number" value={customer.accountNumber} />
            <DetailItem label="Account Type" value={customer.accountType} />
            <DetailItem label="Branch" value={customer.branch} />
            <DetailItem label="Statement Period" value={formattedDateRange} />
        </div>
    </div>
  );
}
