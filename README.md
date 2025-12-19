# LNCT Complaint Management System

A web-based **College Complaint Management System** built to help students raise complaints and track their status, while enabling administrators and staff to manage and resolve issues efficiently.

This project is designed as a real college portal using **Firebase Authentication** and **Cloud Firestore**.

---

## 🚀 Features

### Student
- Email & Password login
- Register new account
- Submit complaints
- Track complaint status

### Admin
- Secure admin login
- View all complaints
- Assign complaints to staff
- Update complaint status

### Staff
- View assigned complaints
- Update complaint progress and status

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Authentication:** Firebase Email & Password Auth
- **Database:** Firebase Cloud Firestore
- **Tools:** Firebase Studio, GitHub

---

## 🔐 Authentication

- Firebase Email & Password Authentication
- Role-based access control:
  - Admin
  - Student
  - Staff

---

## 📂 Firestore Structure

### Users Collection
```json
{
  "uid": "user-id",
  "email": "user@lnctbhopal.edu.in",
  "role": "admin | student | staff"
}
Complaints Collection
json
Copy code
{
  "title": "Complaint title",
  "description": "Complaint details",
  "status": "Pending | In Progress | Resolved",
  "studentId": "user-id",
  "assignedStaffId": "staff-id",
  "createdAt": "timestamp"
}
🔑 Demo Admin Credentials
makefile
Copy code
Email: admin@lnctbhopal.edu.in
Password: admin123
(For demo/testing purpose only)

▶️ How to Run
Clone the repository:

bash
Copy code
git clone https://github.com/aviraj2002/Campus-Complaint-Management-System.git
Open the project in Firebase Studio

Enable Email/Password Authentication:

Firebase Console → Authentication → Sign-in Method

Run using Firebase Studio Preview or deploy with Firebase Hosting

🎯 Project Objective
To provide a centralized, transparent, and efficient complaint handling system for college campuses.

👨‍💻 Author
Abhishek Kumar Barnwal
MCA Student
GitHub: https://github.com/aviraj2002
LinkedIn: https://linkedin.com/in/aviraj2002
