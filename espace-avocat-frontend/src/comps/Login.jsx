import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password
        }
      );

      const data = res.data;

      setMessage(data.message);
      setUser(data.user);

      // save token
      localStorage.setItem("token", data.token);

    } catch (error) {

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server error. Try again.");
      }

    }
  };

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/>

        <button type="submit">Login</button>

      </form>

      {message && <p>{message}</p>}

      {user && (
        <div>
          <h3>User Data</h3>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

    </div>
  );
}