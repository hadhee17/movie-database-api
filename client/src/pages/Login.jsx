import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // banner text
  const [isError, setIsError] = useState(false); // success / error style
  const { login } = useAuth(); // use context login function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // call context login (handles setUser internally)
      const user = await login(email, password);

      // ✅ show success banner
      setMessage(`🎉 Welcome back, ${user.name || "User"}!`);
      setIsError(false);

      // redirect to home after short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Login failed:", err);

      // ❌ show error banner
      setMessage("Invalid email or password. Try again.");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark to-[#1e293b] px-4">
      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Welcome Back 🎬
        </h2>

        {/* Banner message */}
        {message && (
          <div
            className={`mb-4 text-center p-3 rounded-lg font-semibold shadow-md transition-all duration-500 ${
              isError ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-700 bg-[#1e293b] text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-700 bg-[#1e293b] text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
