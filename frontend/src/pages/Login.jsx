import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple pattern checks (basic sanitization)
  const isSuspiciousInput = (value) =>
    /('|--|;|\/\*|\*\/|DROP|SELECT|INSERT|UPDATE|DELETE)/i.test(value);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Email and password are required.");
    return;
  }

  if (isSuspiciousInput(email) || isSuspiciousInput(password)) {
    setError("Invalid input detected.");
    return;
  }

  try {
    const res = await axiosInstance.post("/auth/admin-db1/login", {
      email: email.toLowerCase(),
      password,
    });

   if (res.status === 200 && res.data?.access_token) {
  const token = res.data.access_token;

      // Save to localStorage

      // Dispatch login to Redux
      dispatch(
        login({
            access_token: token,
            token_type: "Bearer",
        })
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 50);
      console.log("Login successful:", res.data);
    } else {
        console.error("Login failed:");
      setError("Invalid credentials.");
    }
  } catch (err) {
    setError("Login failed. Try again.");
    console.error(err); // Optional: for debugging
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value.trim())}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              placeholder="admin@site.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value.trim())}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
