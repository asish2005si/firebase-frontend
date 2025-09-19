
'use server';

import { db } from '@/lib/db';
import type { Transaction } from '@/components/dashboard/transaction-history';

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await db.read('transactions');
  return transactions || [];
}

export async function getCustomerInfo() {
    // In a real app, this would fetch data for the logged-in user
    return {
        fullName: "Jane Doe",
        accountNumber: "50100123456789",
        accountType: "Savings Account",
        branch: "Mumbai - Fort",
    };
}
