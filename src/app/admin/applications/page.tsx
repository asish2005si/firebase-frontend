
import { getApplications } from "@/app/actions/applications";
import { AdminApplicationsTable } from "@/components/admin/admin-applications-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, Clock, XCircle, Users } from "lucide-react";
import type { ApplicationData } from "@/lib/mock-application-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AdminDashboardPage() {
    const applications = await getApplications();

    const totalApplications = applications.length;
    const pendingApps = applications.filter(app => app.status === 'Pending');
    const approvedApps = applications.filter(app => app.status === 'Approved');
    const rejectedApps = applications.filter(app => app.status === 'Rejected');
    
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
                        <div className="text-2xl font-bold">{pendingApps.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{approvedApps.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{rejectedApps.length}</div>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Manage Applications</CardTitle>
                    <CardDescription>View and manage all account applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="approved">Approved</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="mt-4">
                            <AdminApplicationsTable applications={recentApplications} />
                        </TabsContent>
                        <TabsContent value="pending" className="mt-4">
                            <AdminApplicationsTable applications={pendingApps} />
                        </TabsContent>
                        <TabsContent value="approved" className="mt-4">
                            <AdminApplicationsTable applications={approvedApps} />
                        </TabsContent>
                        <TabsContent value="rejected" className="mt-4">
                            <AdminApplicationsTable applications={rejectedApps} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
