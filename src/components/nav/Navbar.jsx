'use client'
import Link from 'next/link'
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
    <div className='over-nav'>
      <nav className="navbar">
        <div className="navbar_left">
          <Link href='/' className="logo">
            <img className='head1' src="/movie_logo.svg" alt="Logo" />
          </Link>
          <IoPersonSharp className='head2' />
          {/* Navigation Links */}
          <div className={`navbar_links ${!isOpen ? "" : "open"}`}>
            <Link href="/movies">Movies</Link>
            <Link href="/tvShows">TV Shows</Link>
            <Link href="/people">People</Link>
            <Link href="/more">More</Link>
            <div className="links-2">
              <Link href="">Contribution Bible</Link>
              <Link href="">Discussions</Link>
              <Link href="">Leaderboard</Link>
              <Link href="">API</Link>
              <Link href="">Support</Link>
              <Link href="">About</Link>
              <Link href="">Login</Link>
            </div>
          </div>
        </div>


        <img className='middle' src='/movie-logo.svg' style={{ width: '40px' }} />

        <button
          className="navbar_toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className="others">
          <Link href=""><FaPlus /></Link>
          <Link className='en' href="">EN</Link>
          <Link href="">Login</Link>
          <Link href="">Join TMDB</Link>
          <Link className='glas' href=""><FaSearch style={{ color: 'blue' }} /></Link>
        </div>
      </nav>

    </div>
  );
};

export default Navbar;
