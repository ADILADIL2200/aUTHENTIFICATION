import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("avocat");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ← إضافة useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          role: role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ← التوجيه لصفحة verify مع تمرير البيانات
        navigate("/verify-email", {
          state: {
            email: data.email,
            message: data.message,
          },
        });
      } else {
        // لو هناك خطأ من السيرفر
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="avocat">Avocat</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <br />

        <button type="submit">Send Code</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}