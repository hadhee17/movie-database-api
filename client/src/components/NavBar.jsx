import { Link, NavLink } from "react-router-dom";

function Navbar() {
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
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:text-primary transition ${isActive ? "text-primary" : ""}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `hover:text-primary transition ${isActive ? "text-primary" : ""}`
            }
          >
            Signup
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
