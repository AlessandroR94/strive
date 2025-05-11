import React from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="logo" className="blog-navbar-brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="d-flex align-items-center gap-2">
            <Button
              as={Link}
              to="/new"
              className="nav-button"
              size="sm"
              variant="outline-light"
            >
              ✍️ Nuovo Articolo
            </Button>

            {isLoggedIn ? (
              <>
                <Button as={Link} to="/profilo" className="nav-button" size="sm" variant="outline-light">
                  👤 Profilo
                </Button>
                <Button as={Link} to="/profilo/modifica" className="nav-button" size="sm" variant="outline-light">
                  ✏️ Modifica
                </Button>
                <Button onClick={handleLogout} className="nav-button" size="sm" variant="danger">
                  🔒 Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" className="nav-button" size="sm" variant="success">
                  🔐 Login
                </Button>
                <Button as={Link} to="/register" className="nav-button" size="sm" variant="primary">
                  📝 Registrati
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
