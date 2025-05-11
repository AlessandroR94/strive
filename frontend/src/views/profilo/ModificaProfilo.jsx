import React, { useState, useEffect } from "react";

const ModificaProfilo = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) setMsg("Profilo aggiornato!");
    else setMsg(data.message || "Errore");
  };

  if (!user) return <p>Caricamento...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Modifica Profilo</h2>
      <input value={user.nome} onChange={e => setUser({ ...user, nome: e.target.value })} />
      <input value={user.cognome} onChange={e => setUser({ ...user, cognome: e.target.value })} />
      <input value={user.avatar} onChange={e => setUser({ ...user, avatar: e.target.value })} />
      <button type="submit">Salva</button>
      {msg && <p>{msg}</p>}
    </form>
  );
};

export default ModificaProfilo;
