function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark to-[#1e293b] px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Join 🎬 Movie Explorer and start discovering
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none"
          />

          {/* Signup Button */}
          <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition">
            Sign Up
          </button>
        </form>

        {/* Login redirect */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
