
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
  
export const mockApplicationData: ApplicationData[] = [
    {
      applicationId: "SB-2025-001",
      accountType: "Savings Account",
      status: "Approved",
      fullName: "Ramesh Kumar",
      dob: "12-05-1998",
      mobile: "+91 XXXXX12345",
      email: "ramesh@example.com",
      address: "Bhubaneswar, Odisha – 751001",
      nominee: "Sita Devi (Mother)",
      initialDeposit: 1000,
      applicationDate: "08-Sept-2025",
      accountNumber: "398765432101",
      ifscCode: "SBIN0009876",
    },
    {
      applicationId: "SB-2025-002",
      accountType: "Student Account",
      status: "Pending",
      fullName: "Priya Sharma",
      dob: "20-08-2004",
      mobile: "+91 XXXXX23456",
      email: "priya@example.com",
      address: "Jaipur, Rajasthan - 302020",
      initialDeposit: 500,
      applicationDate: "10-Sept-2025",
    },
    {
      applicationId: "SB-2025-003",
      accountType: "Current Account",
      status: "Rejected",
      reason: "Invalid GST Number provided. Please contact support to re-apply with a valid GSTIN.",
      fullName: "Ankit Jain (for AJ Enterprises)",
      dob: "15-02-1985",
      mobile: "+91 XXXXX34567",
      email: "ankit@ajenterprises.com",
      address: "Surat, Gujarat - 395007",
      initialDeposit: 5000,
      applicationDate: "05-Sept-2025",
    },
];
