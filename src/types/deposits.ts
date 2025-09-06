
export type FixedDeposit = {
    id: string;
    amount: number;
    tenure: number; // in years
    interestRate: number;
    startDate: string;
    maturityDate: string;
    maturityAmount: number;
    status: "Active" | "Matured" | "Closed";
};

export type RecurringDeposit = {
    id: string;
    monthlyInstallment: number;
    tenure: number; // in years
    interestRate: number;
    startDate: string;
    nextDueDate: string;
    amountDeposited: number;
    maturityAmount: number;
    status: "Active" | "Matured" | "Closed";
};
