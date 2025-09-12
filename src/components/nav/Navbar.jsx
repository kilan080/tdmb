'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Navbar.css';
import { IoPersonSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase'; 
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('Auth state changed:', currentUser ? 'User logged in' : 'User logged out');
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLinkClick = () => {
    setIsOpen(false);
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className='over-nav'>
        <nav className="navbar">
          {/* Your existing navbar structure but with loading indicator */}
          <div>Loading...</div>
        </nav>
      </div>
    );
  }

  return (
    <div className='over-nav'>
      <nav className="navbar">
        <div className="navbar_left">
          <Link href='/' className="logo">
            <Image className='head1' src="/movie_logo.svg" alt="Logo" width={40} height={40}/>
          </Link>
          <IoPersonSharp className='head2' />
          {/* Navigation Links */}
          <div className={`navbar_links ${!isOpen ? "" : "open"}`}>
            <Link onClick={handleLinkClick} href="/movies">Movies</Link>
            <Link onClick={handleLinkClick} href="/tvShows">TV Shows</Link>
            <Link onClick={handleLinkClick} href="/people">People</Link>
            <Link onClick={handleLinkClick} href="/more">More</Link>
            <div className="links-2">
              <Link href="">Contribution Bible</Link>
              <Link href="">Discussions</Link>
              <Link href="">Leaderboard</Link>
              <Link href="">API</Link>
              <Link href="">Support</Link>
              <Link href="">About</Link>
              
              {/* Mobile auth options - both login and logout */}
              {user ? (
                <>
                  <span className="mobile-welcome">
                    Welcome, {user.displayName || user.email}
                  </span>
                  <button 
                    className="mobile-signout-btn"
                    onClick={() => { 
                      handleSignOut(); 
                      setIsOpen(false); 
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
              )}
            </div>
          </div>
        </div>

        <Image className='middle' src='/movie-logo.svg' alt='logo' width={40} height={40} />

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
          {/* Conditional rendering based on user state */}
          {user ? (
            <div className='sign-out'>
              <span>Welcome, {user.displayName || user.email}</span>
              <button className='sign-out-btn' onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
          )}
          <Link href="">Join TMDB</Link>
          <Link className='glas' href=""><FaSearch style={{ color: 'blue' }} /></Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;