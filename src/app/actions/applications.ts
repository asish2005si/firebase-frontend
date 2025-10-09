
'use server';

import { addDoc, collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import type { ApplicationData } from '@/lib/mock-application-data';
import type { LoanApplication } from '@/components/dashboard/loans/loan-applications';
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export async function getApplications(): Promise<ApplicationData[]> {
    const firestore = getFirestore(initializeFirebase().firebaseApp);
    const applicationsRef = collection(firestore, 'applications');
    const snapshot = await getDocs(applicationsRef);
    const applications = snapshot.docs.map(doc => ({ ...doc.data(), applicationId: doc.id } as ApplicationData));
    return applications;
}

export async function saveApplication(applicationData: Omit<ApplicationData, 'applicationId' | 'applicationDate' | 'status'>) {
    const firestore = getFirestore(initializeFirebase().firebaseApp);
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
    const firestore = getFirestore(initializeFirebase().firebaseApp);
    const applicationsRef = collection(firestore, 'loan-applications');
    const snapshot = await getDocs(applicationsRef);
    const applications = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LoanApplication));
    return applications;
}

export async function saveLoanApplication(applicationData: any) {
    const firestore = getFirestore(initializeFirebase().firebaseApp);
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
    const firestore = getFirestore(initializeFirebase().firebaseApp);
    const applicationsRef = collection(firestore, 'applications');
    // In a real app with proper security rules, you'd want to query securely.
    // For now, we query by a custom field if it exists, or by doc ID.
    try {
        const docRef = doc(firestore, 'applications', applicationId);
        const docSnap = await getDocs(query(applicationsRef, where('applicationId', '==', applicationId)));

        if (!docSnap.empty) {
            const doc = docSnap.docs[0];
            return { ...doc.data(), applicationId: doc.id } as ApplicationData;
        }
        
        const docByIdSnap = await getDocs(query(collection(firestore, 'applications'), where('__name__', '==', applicationId)));
        if (!docByIdSnap.empty) {
            const doc = docByIdSnap.docs[0];
            return { ...doc.data(), applicationId: doc.id } as ApplicationData;
        }

    } catch (e) {
         console.error("Error fetching application by ID:", e);
    }
    
    return null;
}


export async function updateApplicationStatus(applicationId: string, newStatus: "Approved" | "Rejected", reason?: string): Promise<{ success: boolean; message?: string }> {
    try {
        const firestore = getFirestore(initializeFirebase().firebaseApp);
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
