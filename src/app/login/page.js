'use client';

import React, { useEffect, useState } from 'react';
import './login.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { analytics, auth, logEvent } from '../../../firebase/firebase';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Make sure auth persists
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
  }, []);

  // Handle redirect result ONLY for Google login
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          toast.success('Logged in with Google');
          logEvent(analytics, 'login', { method: 'google'});
          router.replace('/'); 
        }
      })
      .catch((err) => {
        if (err?.message) {
          console.error('Google redirect error:', err.message);
          toast.error(err.message);
        }
      });
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email login:', user?.uid);
      toast.success('Successfully logged in');
      router.replace('/');
      logEvent(analytics, 'login', { method: 'email_password'});
    } catch (err) {
      console.error('Email login failed:', err.message);
      toast.error(err.message || 'Login failed');
    } 
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error('Google login failed:', err.message);
      toast.error(err.message || 'Google login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to your account</h2>

      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
        <button
          type="button"
          className="login-button google"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
