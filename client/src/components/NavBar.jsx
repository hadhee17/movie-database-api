import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🎬 Movie Explorer
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/login" className="hover:text-blue-500">
          Login
        </Link>
        <Link to="/signup" className="hover:text-blue-500">
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
