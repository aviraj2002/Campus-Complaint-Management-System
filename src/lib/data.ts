
"use client";
// This file simulates the data layer.
// In a real application, this would interact with Firebase Firestore.
import { Complaint, User, UserRole } from "@/types";

// --- Placeholder Data ---
let users: User[] = [
  { uid: 'student1', name: 'Alice Johnson', email: 'alice@example.com', role: 'student', photoURL: 'https://picsum.photos/seed/1/100/100' },
  { uid: 'student2', name: 'Bob Williams', email: 'bob@example.com', role: 'student', photoURL: 'https://picsum.photos/seed/2/100/100' },
  { uid: 'admin_user_id', name: 'Admin User', email: 'admin@example.com', role: 'admin', photoURL: 'https://picsum.photos/seed/3/100/100' },
  { uid: 'staff1', name: 'Charlie Brown', email: 'charlie@example.com', role: 'staff', photoURL: 'https://picsum.photos/seed/4/100/100' },
  { uid: 'staff2', name: 'Diana Miller', email: 'diana@example.com', role: 'staff', photoURL: 'https://picsum.photos/seed/5/100/100' },
];

let complaints: Complaint[] = [
  {
    id: 'complaint1',
    title: 'Leaky Faucet in Bathroom',
    description: 'The faucet in the 2nd-floor men\'s bathroom has been dripping constantly for three days.',
    category: 'infrastructure',
    priority: 'medium',
    status: 'new',
    studentId: 'student1',
    student: users.find(u => u.uid === 'student1'),
    createdAt: new Date('2023-10-26T10:00:00Z').toISOString(),
  },
  {
    id: 'complaint2',
    title: 'Wi-Fi not working in library',
    description: 'Cannot connect to the "CollegeNet" Wi-Fi network in the main library building. It was working yesterday.',
    category: 'infrastructure',
    priority: 'high',
    status: 'assigned',
    studentId: 'student2',
    student: users.find(u => u.uid === 'student2'),
    assignedStaffId: 'staff1',
    createdAt: new Date('2023-10-27T11:00:00Z').toISOString(),
  },
  {
    id: 'complaint3',
    title: 'Course registration issue',
    description: 'I am unable to register for the CS101 course, it shows an error "prerequisites not met" but I have completed them.',
    category: 'academic',
    priority: 'high',
    status: 'in-progress',
    studentId: 'student1',
    student: users.find(u => u.uid === 'student1'),
    assignedStaffId: 'staff2',
    createdAt: new Date('2023-10-27T14:00:00Z').toISOString(),
  },
  {
    id: 'complaint4',
    title: 'Broken window in Hostel Room 301',
    description: 'A window pane is cracked in my hostel room (301, Block B).',
    category: 'hostel',
    priority: 'medium',
    status: 'resolved',
    studentId: 'student2',
    student: users.find(u => u.uid === 'student2'),
    assignedStaffId: 'staff1',
    createdAt: new Date('2023-10-25T09:00:00Z').toISOString(),
  },
];

// --- Data Access Functions ---

const defaultRole: UserRole = 'student';

export async function createUserProfile(user: Omit<User, 'role'>) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const existingUser = users.find(u => u.uid === user.uid);
    if (!existingUser) {
        const newUser: User = {
            ...user,
            role: defaultRole,
        };
        users.push(newUser);
    }
}

export async function getUser(uid: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return users.find(u => u.uid === uid) || null;
}

// This function now just simulates getting a current user for non-critical server actions.
// The real user object with roles is handled on the client.
export async function getCurrentUser(): Promise<User | null> {
    // In a real app with server-side rendering and auth, this would be different.
    // For this client-side focused demo, we'll return a placeholder.
    // The actual user context is managed by `useAuth` hook on the client.
    return users.find(u => u.role === 'admin') || null;
}


// In a real app, you'd fetch from Firestore `complaints` collection
export async function getAllComplaints(): Promise<Complaint[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return complaints.map(c => ({
    ...c,
    student: users.find(u => u.uid === c.studentId)
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// In a real app, you'd query Firestore: `where('studentId', '==', studentId)`
export async function getMyComplaints(studentId: string): Promise<Complaint[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return complaints.filter(c => c.studentId === studentId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// In a real app, you'd query Firestore: `where('assignedStaffId', '==', staffId)`
export async function getAssignedComplaints(staffId: string): Promise<Complaint[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return complaints.filter(c => c.assignedStaffId === staffId).map(c => ({
    ...c,
    student: users.find(u => u.uid === c.studentId)
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// In a real app, you'd query the `users` collection: `where('role', '==', 'staff')`
export async function getStaffList(): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return users.filter(u => u.role === 'staff');
}

// In a real app, you'd add a new document to the `complaints` collection
export async function createComplaint(data: Omit<Complaint, 'id' | 'status' | 'createdAt'>): Promise<Complaint> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newComplaint: Complaint = {
    ...data,
    id: `complaint${complaints.length + 1}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  complaints.push(newComplaint);
  return newComplaint;
}

// In a real app, you'd update a document in the `complaints` collection
export async function updateComplaint(id: string, data: Partial<Complaint>): Promise<Complaint> {
  await new Promise(resolve => setTimeout(resolve, 500));
  complaints = complaints.map(c => c.id === id ? { ...c, ...data } : c);
  const updated = complaints.find(c => c.id === id);
  if (!updated) throw new Error("Complaint not found");
  return updated;
}
