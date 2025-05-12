import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import ProfiloUtente from "./views/profilo/ProfiloUtente";
import ModificaProfilo from "./views/profilo/ModificaProfilo";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/data`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('Errore:', err));
  }, []);

  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: "4rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotte protette */}
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewBlogPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profilo"
            element={
              <ProtectedRoute>
                <ProfiloUtente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profilo/modifica"
            element={
              <ProtectedRoute>
                <ModificaProfilo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
