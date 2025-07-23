'use client'
import React, { useState } from 'react';
import './Navbar.css';
import { IoPersonSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <a href='/' className="logo">
        <img className='head1' src="/movie_logo.svg" alt="Logo" />
        <IoPersonSharp className='head2' />
        <div className={`navbar_links ${isOpen ? "open" : ""}`}>
          <a href="/movies">Movies</a>
          <a href="/tvShows">TV Shows</a>
          <a href="/people">People</a>
          <a href="/more">More</a>
          <div className="links-2">
            <a href="">Contribution Bible</a>
            <a href="">Discussions</a>
            <a href="">Leaderboard</a>
            <a href="">API</a>
            <a href="">Support</a>
            <a href="">About</a>
            <a href="">Login</a>
          </div>
        </div>

      </a>


      <img className='middle' src='/movie-logo.svg' style={{ width: '40px'}} />

      <button
        className="navbar_toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      <div className="others">
        <a href=""><FaPlus /></a>
        <a className='en' href="">EN</a>
        <a href="">Login</a>
        <a href="">Join TMDB</a>
        <a className='glas' href=""><FaSearch style={{ color: 'blue' }} /></a>
      </div>


    </nav>
  );
};

export default Navbar;
