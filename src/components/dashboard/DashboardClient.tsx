"use client";

import type { User, Complaint } from "@/types";
import { AdminView } from "./AdminView";
import { StaffView } from "./StaffView";
import { StudentView } from "./StudentView";

interface DashboardClientProps {
  user: User;
  initialComplaints: Complaint[];
  staffList?: User[];
}

export function DashboardClient({
  user,
  initialComplaints,
  staffList = [],
}: DashboardClientProps) {
  
  if (user.role === "admin") {
    return (
      <AdminView
        complaints={initialComplaints}
        currentUser={user}
        staffList={staffList}
      />
    );
  }

  if (user.role === "staff") {
    return (
      <StaffView complaints={initialComplaints} currentUser={user} />
    );
  }

  return <StudentView complaints={initialComplaints} currentUser={user} />;
}
