import type { Complaint, User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplaintList } from "../complaints/ComplaintList";

interface AdminViewProps {
  complaints: Complaint[];
  currentUser: User;
  staffList: User[];
}

export function AdminView({ complaints, currentUser, staffList }: AdminViewProps) {
  const filterComplaints = (status: string | string[]) =>
    complaints.filter((c) => (Array.isArray(status) ? status.includes(c.status) : c.status === status));

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Total Complaints: {complaints.length}</p>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <ComplaintList complaints={complaints} currentUser={currentUser} staffList={staffList} />
        </TabsContent>
        <TabsContent value="new" className="mt-6">
          <ComplaintList complaints={filterComplaints(["new", "assigned"])} currentUser={currentUser} staffList={staffList} />
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          <ComplaintList complaints={filterComplaints("in-progress")} currentUser={currentUser} staffList={staffList} />
        </TabsContent>
        <TabsContent value="resolved" className="mt-6">
          <ComplaintList complaints={filterComplaints("resolved")} currentUser={currentUser} staffList={staffList} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
