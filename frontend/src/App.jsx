import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ReportItem from "./pages/ReportItem";
import ItemDetails from "./pages/ItemDetails";
import MyReports from "./pages/MyReports";

import EditItem from "./pages/EditItem";

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";




export default function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lost" element={<LostItems />} />
          <Route path="/found" element={<FoundItems />} />
          <Route path="/items/:id" element={<ItemDetails />} />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportItem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/items/:id/edit"
            element={
              <ProtectedRoute>
                <EditItem />
              </ProtectedRoute>
            }
          />


          <Route
            path="/my-reports"
            element={
              <ProtectedRoute>
                <MyReports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />









        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
