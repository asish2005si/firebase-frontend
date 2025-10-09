
'use server';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Transaction } from '@/types/transaction';

export async function getTransactions(userId: string): Promise<Transaction[]> {
  const firestore = getFirestore(initializeFirebase().firebaseApp);
  const transactionsRef = collection(firestore, 'transactions');
  const q = query(transactionsRef, where("performed_by", "==", userId));
  
  const snapshot = await getDocs(q);
  const transactions = snapshot.docs.map(doc => ({ ...doc.data(), txn_id: doc.id } as Transaction));
  return transactions;
}

export async function getCustomerInfo() {
    // This could be enhanced to fetch from a 'customers' collection
    // based on the logged-in user's UID.
    return {
        fullName: "Jane Doe",
        accountNumber: "50100123456789",
        accountType: "Savings Account",
        branch: "Mumbai - Fort",
    };
}
