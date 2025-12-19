import type { Complaint, User } from "@/types";
import { ComplaintCard } from "./ComplaintCard";
import { FileText } from "lucide-react";

interface ComplaintListProps {
  complaints: Complaint[];
  currentUser: User;
  staffList?: User[];
}

export function ComplaintList({ complaints, currentUser, staffList }: ComplaintListProps) {
  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">No Complaints Found</h3>
        <p className="mt-2 text-sm text-muted-foreground">There are no complaints to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {complaints.map((complaint) => (
        <ComplaintCard 
          key={complaint.id} 
          complaint={complaint} 
          currentUser={currentUser} 
          staffList={staffList} 
        />
      ))}
    </div>
  );
}
