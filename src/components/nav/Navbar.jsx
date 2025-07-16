import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <a href='/' className="logo">
        <img src="/movie_logo.svg" alt="Logo" />
      </a>

      <div className={`navbar_links ${isOpen ? "open" : ""}`}>
        <a href="">Movies</a>
        <a href="">TV Shows</a>
        <a href="">People</a>
        <a href="">More</a>
      </div>

      <button
        className="navbar_toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
