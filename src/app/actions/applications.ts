
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
    const sequentialNumber = (allApplications.length || 0) + 1;
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
