
'use server';

import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
    
    const docRef = await addDocumentNonBlocking(applicationsRef, newApplication);
    
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

    const docRef = await addDocumentNonBlocking(applicationsRef, newApplication);
    
    return { ...newApplication, id: docRef.id };
}

export async function getApplicationById(applicationId: string): Promise<ApplicationData | null> {
    const firestore = getFirestore(initializeFirebase().firebaseApp);
    const applicationsRef = collection(firestore, 'applications');
    const q = query(applicationsRef, where("applicationId", "==", applicationId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        // Fallback to mock data if not found in user applications
        const mockApplications: ApplicationData[] = (await import('@/lib/data/mock-applications.json')).default;
        const application = mockApplications.find(app => app.applicationId.toLowerCase() === applicationId.toLowerCase());
        return application || null;
    }
    
    const doc = snapshot.docs[0];
    return { ...doc.data(), applicationId: doc.id } as ApplicationData;
}


export async function updateApplicationStatus(applicationId: string, newStatus: "Approved" | "Rejected", reason?: string): Promise<{ success: boolean; message?: string }> {
    try {
        const firestore = getFirestore(initializeFirebase().firebaseApp);
        const applicationsRef = collection(firestore, 'applications');
        const q = query(applicationsRef, where("applicationId", "==", applicationId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return { success: false, message: "Application not found." };
        }
        
        const docToUpdate = snapshot.docs[0].ref;
        const updateData: Partial<ApplicationData> = { status: newStatus };
        if (newStatus === 'Rejected') {
            updateData.reason = reason || 'No reason provided.';
        } else {
            delete updateData.reason;
        }

        await addDocumentNonBlocking(docToUpdate, updateData);
        
        return { success: true };

    } catch (error) {
        console.error("Error updating application status:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}
