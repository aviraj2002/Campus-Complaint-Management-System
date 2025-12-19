export type UserRole = "student" | "admin" | "staff";

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  photoURL?: string | null;
}

export type ComplaintCategory = "academic" | "infrastructure" | "hostel" | "other";
export type ComplaintPriority = "low" | "medium" | "high";
export type ComplaintStatus = "new" | "assigned" | "in-progress" | "resolved";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  studentId: string;
  student?: User;
  assignedStaffId?: string;
  createdAt: string;
  resolvedAt?: string;
}
