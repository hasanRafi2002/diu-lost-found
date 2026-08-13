import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary-600">
          DIU Lost & Found
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/lost" className="hover:text-primary-600">Lost Items</Link>
          <Link to="/found" className="hover:text-primary-600">Found Items</Link>

          {isAuthenticated ? (
            <>
                  <Link to="/report" className="hover:text-primary-600">Report Item</Link>
                  <Link to="/my-reports" className="hover:text-primary-600">My Reports</Link>
                  {user?.role === "ADMIN" && (
                  <Link to="/admin" className="text-primary-600 font-semibold hover:underline">
                  Admin
                  </Link>
                  )}
                  <NotificationBell />
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-800">{user?.full_name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
            <>
              <Link to="/login" className="hover:text-primary-600">Login</Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-1.5 rounded-md hover:bg-primary-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
