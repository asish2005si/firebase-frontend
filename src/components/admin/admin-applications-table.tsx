
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ApplicationData } from "@/lib/mock-application-data";
import { Button } from "../ui/button";
import Link from "next/link";

type AdminApplicationsTableProps = {
    applications: ApplicationData[];
}

const statusColors: Record<ApplicationData['status'], string> = {
    "Approved": "bg-green-600",
    "Pending": "bg-yellow-500",
    "Rejected": "bg-red-600",
};

export function AdminApplicationsTable({ applications }: AdminApplicationsTableProps) {
  return (
    <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App ID</TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
                applications.map((app) => (
                <TableRow key={app.applicationId}>
                    <TableCell className="font-medium truncate max-w-[120px]">{app.applicationId}</TableCell>
                    <TableCell>{app.fullName}</TableCell>
                    <TableCell>{app.accountType}</TableCell>
                    <TableCell>{new Date(app.applicationDate).toLocaleDateString("en-GB")}</TableCell>
                    <TableCell>
                        <Badge className={statusColors[app.status]}>{app.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Link href={`/admin/applications/${app.applicationId}`}>
                            <Button variant="outline" size="sm">View</Button>
                        </Link>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                        No applications found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  );
}
