
'use server';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Transaction } from '@/types/transaction';

// This function is kept for components that may not have been fully migrated yet.
// It should be deprecated and removed once all transaction fetching is done client-side.
export async function getTransactions(userId: string): Promise<Transaction[]> {
  const firestore = getFirestore(initializeFirebase().firebaseApp);
  const transactionsRef = collection(firestore, 'transactions');
  const q = query(transactionsRef, where("performed_by", "==", userId));
  
  const snapshot = await getDocs(q);
  const transactions = snapshot.docs.map(doc => ({ ...doc.data(), txn_id: doc.id } as Transaction));
  return transactions;
}
