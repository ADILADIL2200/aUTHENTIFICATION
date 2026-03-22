import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract token and email from URL
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (!tokenParam || !emailParam) {
      setError("Invalid reset link.");
    } else {
      setToken(tokenParam);
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/resetPassword", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage(response.data.message);
      // Optionally redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err.response);
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Confirm Password:
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}