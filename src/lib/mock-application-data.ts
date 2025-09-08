
export type ApplicationData = {
    applicationId: string;
    accountType: "Savings Account" | "Student Account" | "Salary Account" | "Current Account";
    status: "Approved" | "Pending" | "Rejected";
    reason?: string;
    fullName: string;
    dob: string;
    mobile: string;
    email: string;
    address: string;
    nominee?: string;
    initialDeposit: number;
    applicationDate: string;
    accountNumber?: string;
    ifscCode?: string;
};
  
export const mockApplicationData: ApplicationData[] = [];
