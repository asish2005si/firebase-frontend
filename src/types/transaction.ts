
export type Transaction = {
    txn_id: string;
    account_no: string;
    txn_type: "debit" | "credit" | "Bill Payment" | "Fund Transfer";
    amount: number;
    balance_after: number;
    description: string;
    txn_time: string;
    performed_by: string;
};
