import Register from "./components/RegisterComponent/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponent/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./components/AdminComponent/AdminDashboard";
import Header from "./components/HeaderComponent/Header";
import UserDashboard from "./components/UserComponent/UserDashboard";
import ProtectedRoute from "./components/AuthComponent/ProtectedRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
