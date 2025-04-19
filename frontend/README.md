# React + Vite

# 🔐 User Auth System with Admin Excel Export (MERN Stack)

This full-stack project includes a Node.js + Express backend and a React frontend for:

- ✅ User Registration & Login
- ✅ JWT-based Authentication
- ✅ Protected Routes for Admin/User
- ✅ Admin Feature: Download user data in Excel format
- ✅ Frontend-level auth using `localStorage` and protected React routes

---

## 🔧 Technologies Used

### Backend (Node.js)

- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- exceljs
- dotenv

### Frontend (React)

- React Router
- Axios
- LocalStorage for token management
- Conditional navigation (logout if token is missing/invalid)

---

## 📌 Features

### 🔐 User Auth

- Register: `POST /register`
- Login: `POST /login`
- Token-based auth with protected routes using middleware

### 🧾 Excel Export (Admin Only)

- On user registration, details saved to `exports/users.xlsx`
- Admin can download file from:  
  `GET /admin/download-users-excel`

### 🧠 Frontend Auth (React)

- Token saved in `localStorage`
- Protected admin route (e.g. `/admin`)
- Auto logout if token missing/invalid
