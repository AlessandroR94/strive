import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Leggi il token se arriva da /auth/google/callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/profilo");
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setError("");
        navigate("/profilo");
      } else {
        setError(data.message || "Credenziali non valide");
      }
    } catch (err) {
      setError("Errore di rete");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Login</button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <p>oppure</p>
        <a href="http://localhost:3001/auth/google">
          <button style={{ backgroundColor: "#4285F4", color: "white", padding: "0.5rem 1rem", border: "none", cursor: "pointer" }}>
            Accedi con Google
          </button>
        </a>
      </div>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};

export default Login;


