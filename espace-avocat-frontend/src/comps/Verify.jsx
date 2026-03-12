import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || ""; // ← استلام البريد من Register
  const [message, setMessage] = useState(location.state?.message || "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json","Accept": "application/json" },
        body: JSON.stringify({
          email,
          code,
          password,
          password_confirmation: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);

        navigate("/cc", {
          state: { user: data.user, user_id: data.user.id, token: data.token },
        });
      } else {
          setMessage(
    (data.message || "Verification failed.") +
    (data.error ? ` | Server: ${data.error}` : "")
  );
      
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Verify Your Email</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Verify Email</button>
      </form>
    </div>
  );
}

export default VerifyEmail;