import type { Complaint, User } from "@/types";
import { ComplaintList } from "../complaints/ComplaintList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface StaffViewProps {
  complaints: Complaint[];
  currentUser: User;
}

export function StaffView({ complaints, currentUser }: StaffViewProps) {
  const filterComplaints = (status: string) =>
    complaints.filter((c) => c.status === status);

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Staff Dashboard</h1>
        <p className="text-muted-foreground">Assigned Complaints: {complaints.length}</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <ComplaintList complaints={complaints.filter(c => c.status !== 'resolved')} currentUser={currentUser} />
        </TabsContent>
        <TabsContent value="resolved" className="mt-6">
          <ComplaintList complaints={filterComplaints("resolved")} currentUser={currentUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
