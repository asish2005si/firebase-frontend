
'use server';

import { addDoc, collection, getDocs, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import type { ApplicationData } from '@/lib/mock-application-data';
import type { LoanApplication } from '@/components/dashboard/loans/loan-applications';
import { initializeFirebase } from '@/firebase';
import { FirestorePermissionError } from '@/firebase/errors';

export async function getApplications(): Promise<ApplicationData[]> {
    const { firestore } = initializeFirebase();
    const applicationsRef = collection(firestore, 'applications');
    const snapshot = await getDocs(applicationsRef);
    const applications = snapshot.docs.map(doc => ({ ...doc.data(), applicationId: doc.id } as ApplicationData));
    return applications;
}

export async function saveApplication(applicationData: Omit<ApplicationData, 'applicationId' | 'applicationDate' | 'status'>) {
    const { firestore } = initializeFirebase();
    const applicationsRef = collection(firestore, 'applications');
    
    const newApplication = {
        ...applicationData,
        applicationDate: new Date().toISOString().split('T')[0],
        status: "Pending",
    };
    
    const docRef = await addDoc(applicationsRef, newApplication);
    
    return { ...newApplication, applicationId: docRef.id };
}

export async function getLoanApplications(): Promise<LoanApplication[]> {
    const { firestore } = initializeFirebase();
    const applicationsRef = collection(firestore, 'loan-applications');
    try {
        const snapshot = await getDocs(applicationsRef);
        const applications = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LoanApplication));
        return applications;
    } catch (e) {
        throw new FirestorePermissionError({
            path: 'loan-applications',
            operation: 'list'
        })
    }
}

export async function saveLoanApplication(applicationData: any) {
    const { firestore } = initializeFirebase();
    const applicationsRef = collection(firestore, 'loan-applications');
    const newApplication: Omit<LoanApplication, 'id'> = {
        type: applicationData.loanType,
        amount: applicationData.amount,
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
    };

    const docRef = await addDoc(applicationsRef, newApplication);
    
    return { ...newApplication, id: docRef.id };
}

export async function getApplicationById(applicationId: string): Promise<ApplicationData | null> {
    const { firestore } = initializeFirebase();
    try {
        const docRef = doc(firestore, 'applications', applicationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { ...docSnap.data(), applicationId: docSnap.id } as ApplicationData;
        }

    } catch (e) {
         console.error("Error fetching application by ID:", e);
    }
    
    return null;
}


export async function updateApplicationStatus(applicationId: string, newStatus: "Approved" | "Rejected", reason?: string): Promise<{ success: boolean; message?: string }> {
    try {
        const { firestore } = initializeFirebase();
        const docRef = doc(firestore, 'applications', applicationId);
        
        const updateData: Partial<ApplicationData> = { status: newStatus };
        if (newStatus === 'Rejected' && reason) {
            updateData.reason = reason;
        } else if (newStatus === 'Approved') {
            // In a real scenario, you'd generate a real account number.
            updateData.accountNumber = `50100${Math.floor(100000000 + Math.random() * 900000000)}`;
            updateData.ifscCode = "NEXS0000001";
        }

        await updateDoc(docRef, updateData);
        
        return { success: true };

    } catch (error) {
        console.error("Error updating application status:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}
