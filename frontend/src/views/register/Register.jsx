import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cognome,
          avatar,
          dataDiNascita,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/"); // o /dashboard se hai una pagina dedicata
      } else {
        setError(data.message || "Errore nella registrazione");
      }
    } catch (err) {
      setError("Errore di rete");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Registrazione</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div>
          <label>Cognome:</label><br />
          <input type="text" value={cognome} onChange={(e) => setCognome(e.target.value)} required />
        </div>

        <div>
          <label>Avatar (URL):</label><br />
          <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} required />
        </div>

        <div>
          <label>Data di nascita:</label><br />
          <input
            type="date"
            value={dataDiNascita}
            onChange={(e) => setDataDiNascita(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit">Registrati</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
