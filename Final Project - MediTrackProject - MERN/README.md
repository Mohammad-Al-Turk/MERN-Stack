# MediTracker - Internal Clinic Management System

## 📌 Project Overview
**MediTracker** is an internal clinic management system designed to streamline medical appointments, enhance patient record management, and optimize workflow for healthcare professionals.

The system ensures efficient scheduling, secure medical data handling, and easy prescription management.

## 🚀 Technologies Used
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB
- **Frontend:** React
- **Authentication:** JWT

## 🔑 Key Features
✅ Role-based access control  
✅ Appointment scheduling & tracking  
✅ Secure medical records management (General history & visit notes)  
✅ Prescription management (Export to PDF, Email)

## 👥 User Roles
- **Practitioner:** Views medical data, schedules appointments, issues prescriptions
- **Nurse:** Views medical data, assists with scheduling
- **Assistant:** Books appointments but has no access to medical records

## 🗄️ Database Structure (MongoDB Schema)
- **Users:** Practitioner, Nurse, Assistant
- **Appointments:** Patient info, Date, Status
- **Medical Records:** General history, Visit notes, Assigned Practitioner
- **Prescriptions:** Patient, Medications, PDF export

## 🏗️ Development Plan
1️⃣ Set up Express.js backend and MongoDB  
2️⃣ Build API endpoints for authentication, roles, appointments, and medical records  
3️⃣ Develop React frontend and integrate with API  
4️⃣ Implement role-based access control  
5️⃣ Develop appointment scheduling and prescription management features  
6️⃣ Optimize performance and deploy

## 📜 License
This project is open-source. Feel free to contribute and improve!

---

💡 **Contributions & Issues:** Have an idea? Found a bug? Open an issue or contribute to the repo! 🚀  
