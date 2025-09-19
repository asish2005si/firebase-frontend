
'use server';

import { db } from '@/lib/db';
import type { ApplicationData } from '@/lib/mock-application-data';
import type { LoanApplication } from '@/components/dashboard/loans/loan-applications';

export async function getApplications(): Promise<ApplicationData[]> {
    const applications = await db.read('applications');
    const mockApplications = await db.read('mock-applications');
    return [...(applications || []), ...(mockApplications || [])];
}

export async function saveApplication(applicationData: Omit<ApplicationData, 'applicationId' | 'applicationDate' | 'status'>) {
    const allApplications = await getApplications();
    
    const currentYear = new Date().getFullYear();
    // Find the highest existing sequential number for the current year to avoid collisions
    const yearApplications = allApplications.filter(app => app.applicationId.startsWith(`NX-${currentYear}-`));
    const lastSeq = yearApplications.reduce((max, app) => {
        const seq = parseInt(app.applicationId.split('-')[2], 10);
        return seq > max ? seq : max;
    }, 0);

    const sequentialNumber = lastSeq + 1;
    const newApplicationId = `NX-${currentYear}-${String(sequentialNumber).padStart(3, '0')}`;

    const newApplication: ApplicationData = {
        ...applicationData,
        applicationId: newApplicationId,
        applicationDate: new Date().toISOString().split('T')[0],
        status: "Pending", // Default status for new applications
    };
    
    // We only write to the main 'applications.json', not the mock file
    const userApplications = (await db.read('applications')) || [];
    userApplications.push(newApplication);
    await db.write('applications', userApplications);
    
    return newApplication;
}

export async function getLoanApplications(): Promise<LoanApplication[]> {
    const applications = await db.read('loan-applications');
    return applications || [];
}

export async function saveLoanApplication(applicationData: any) {
    const applications = await getLoanApplications();
    
    const newApplication: LoanApplication = {
        id: `LN-${Date.now()}`,
        type: applicationData.loanType,
        amount: applicationData.amount,
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
    };

    applications.push(newApplication);
    await db.write('loan-applications', applications);

    return newApplication;
}

export async function getApplicationById(applicationId: string): Promise<ApplicationData | null> {
    const allApplications = await getApplications();
    const application = allApplications.find(app => app.applicationId.toLowerCase() === applicationId.toLowerCase());
    return application || null;
}

export async function updateApplicationStatus(applicationId: string, newStatus: "Approved" | "Rejected"): Promise<{ success: boolean; message?: string }> {
    try {
        let userApplications = (await db.read('applications')) || [];
        let mockApplications = (await db.read('mock-applications')) || [];

        let appUpdated = false;

        // Try to find and update in user-submitted applications
        const userAppIndex = userApplications.findIndex((app: ApplicationData) => app.applicationId.toLowerCase() === applicationId.toLowerCase());
        if (userAppIndex !== -1) {
            userApplications[userAppIndex].status = newStatus;
            await db.write('applications', userApplications);
            appUpdated = true;
        } else {
            // If not found, try to find and update in mock applications
            const mockAppIndex = mockApplications.findIndex((app: ApplicationData) => app.applicationId.toLowerCase() === applicationId.toLowerCase());
            if (mockAppIndex !== -1) {
                mockApplications[mockAppIndex].status = newStatus;
                await db.write('mock-applications', mockApplications);
                appUpdated = true;
            }
        }

        if (appUpdated) {
            return { success: true };
        } else {
            return { success: false, message: "Application not found." };
        }
    } catch (error) {
        console.error("Error updating application status:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}
