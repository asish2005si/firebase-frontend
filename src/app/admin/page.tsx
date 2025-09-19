
import { getApplications } from "@/app/actions/applications";
import { AdminApplicationsTable } from "@/components/admin/admin-applications-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function AdminDashboardPage() {
    const applications = await getApplications();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Applications</CardTitle>
                <CardDescription>A list of all submitted account applications.</CardDescription>
            </CardHeader>
            <CardContent>
                <AdminApplicationsTable applications={applications} />
            </CardContent>
        </Card>
    );
}
