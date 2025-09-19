
import { getApplicationById } from "@/app/actions/applications";
import { AdminApplicationView } from "@/components/admin/admin-application-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

export default async function ApplicationDetailsPage({ params }: { params: { applicationId: string } }) {
    const application = await getApplicationById(params.applicationId);

    if (!application) {
        notFound();
    }

    return (
        <AdminApplicationView application={application} />
    );
}
