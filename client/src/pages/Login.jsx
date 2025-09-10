function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark to-[#1e293b] px-4">
      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Welcome Back 🎬
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-700 bg-[#1e293b] text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-700 bg-[#1e293b] text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button className="mt-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
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
