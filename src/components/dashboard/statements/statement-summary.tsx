
"use client";

type SummaryProps = {
    summary: {
        openingBalance: number;
        closingBalance: number;
        totalCredits: number;
        totalDebits: number;
    }
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
};


const SummaryCard = ({ title, value, className }: { title: string, value: string, className?: string}) => (
    <div className={`p-4 rounded-lg bg-background text-center border ${className}`}>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-bold">{value}</p>
    </div>
)

export function StatementSummary({ summary }: SummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Opening Balance" value={formatCurrency(summary.openingBalance)} />
        <SummaryCard title="Total Credits (+)" value={formatCurrency(summary.totalCredits)} className="text-green-600" />
        <SummaryCard title="Total Debits (-)" value={formatCurrency(summary.totalDebits)} className="text-red-600" />
        <SummaryCard title="Closing Balance" value={formatCurrency(summary.closingBalance)} />
    </div>
  );
}
