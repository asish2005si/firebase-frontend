
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
      applicationId: 'NX-2024-001',
      accountType: 'Savings Account',
      status: 'Approved',
      fullName: 'John Mock',
      dob: '1990-05-15',
      mobile: '9876543210',
      email: 'john.mock@example.com',
      address: '123, Mock Lane, Test City - 400001',
      nominee: 'Jane Mock',
      initialDeposit: 5000,
      applicationDate: '2024-07-10',
      accountNumber: '50100987654321',
      ifscCode: 'NEXS0000001',
    },
    {
      applicationId: 'NX-2024-002',
      accountType: 'Current Account',
      status: 'Pending',
      fullName: 'Alice Business',
      dob: '1985-11-20',
      mobile: '9876543211',
      email: 'alice.b@example.com',
      address: '456, Biz Avenue, Work Town - 400002',
      nominee: 'Bob Business',
      initialDeposit: 25000,
      applicationDate: '2024-07-28',
    },
    {
      applicationId: 'NX-2024-003',
      accountType: 'Savings Account',
      status: 'Rejected',
      reason: 'PAN card details did not match with income tax records.',
      fullName: 'Charlie Reject',
      dob: '1995-02-25',
      mobile: '9876543212',
      email: 'charlie.r@example.com',
      address: '789, Fail Street, Error Ville - 400003',
      nominee: 'Diana Reject',
      initialDeposit: 1000,
      applicationDate: '2024-07-25',
    },
];

// We are moving the mock data into its own file to be read by the db service.
// This is to better simulate a database.
