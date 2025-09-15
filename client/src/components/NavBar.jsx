import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to home
  };

  return (
    <nav className="bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-extrabold text-primary">
          🎬 MovieVerse
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-gray-300 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-primary transition ${isActive ? "text-primary" : ""}`
            }
          >
            Home
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-primary transition ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-primary transition ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
