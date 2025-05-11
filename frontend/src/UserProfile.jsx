import { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Errore:", err));
  }, []);

  if (!user) return <p>Caricamento...</p>;

  return (
    <div>
      <h2>Benvenuto, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
