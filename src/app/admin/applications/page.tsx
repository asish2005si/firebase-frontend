import { getApplications } from "@/app/actions/applications";
import { AdminApplicationsTable } from "@/components/admin/admin-applications-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, Clock, XCircle, Users } from "lucide-react";
import type { ApplicationData } from "@/lib/mock-application-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AdminDashboardPage() {
    const applications = await getApplications();

    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'Pending').length;
    const approvedApplications = applications.filter(app => app.status === 'Approved').length;
    const rejectedApplications = applications.filter(app => app.status === 'Rejected').length;
    
    // Sort applications by date, most recent first
    const recentApplications = [...applications].sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());


    return (
        <div className="flex flex-col gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalApplications}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingApplications}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{approvedApplications}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{rejectedApplications}</div>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>A list of the most recently submitted account applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AdminApplicationsTable applications={recentApplications} />
                </CardContent>
            </Card>
        </div>
    );
}
