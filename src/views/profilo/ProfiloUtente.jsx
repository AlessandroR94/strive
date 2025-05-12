import React, { useEffect, useState } from "react";

const ProfiloUtente = () => {
  const [user, setUser] = useState(null);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Errore durante il recupero dei dati");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setErrore("Errore nel caricamento del profilo.");
      }
    };

    fetchUser();
  }, []);

  if (errore) return <p>{errore}</p>;
  if (!user) return <p>Caricamento...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Profilo utente</h2>
      <img src={user.avatar} alt="Avatar" style={{ width: "100px", borderRadius: "50%" }} />
      <p><strong>Nome:</strong> {user.nome} {user.cognome}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Data di nascita:</strong> {new Date(user.dataDiNascita).toLocaleDateString()}</p>
    </div>
  );
};

export default ProfiloUtente;
