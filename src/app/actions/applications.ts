
'use server';

import { db } from '@/lib/db';
import type { ApplicationData } from '@/lib/mock-application-data';
import type { LoanApplication } from '@/components/dashboard/loans/loan-applications';

export async function getApplications(): Promise<ApplicationData[]> {
    const applications = await db.read('applications');
    return applications || [];
}

export async function saveApplication(applicationData: Omit<ApplicationData, 'applicationId' | 'applicationDate' | 'status'>) {
    const applications = await getApplications();
    
    const currentYear = new Date().getFullYear();
    const sequentialNumber = (applications.length || 0) + 1;
    const newApplicationId = `NX-${currentYear}-${String(sequentialNumber).padStart(3, '0')}`;

    const newApplication: ApplicationData = {
        ...applicationData,
        applicationId: newApplicationId,
        applicationDate: new Date().toISOString().split('T')[0],
        status: "Pending", // Default status for new applications
    };

    applications.push(newApplication);
    await db.write('applications', applications);
    
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
    const allApplications = await db.read('applications');
    const mockApplications = await db.read('mock-applications');
    const applications = [...(allApplications || []), ...(mockApplications || [])];
    
    const application = applications.find(app => app.applicationId.toLowerCase() === applicationId.toLowerCase());
    return application || null;
}
