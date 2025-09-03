'use client';

import React, { useState } from 'react';
import './login.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { auth } from '../../../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful", userCredential.user);
      toast.success('Successfully logged in');
      router.push('/');
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google login successful:", result.user);
      toast.success('Successfully logged in with Google');
      router.push('/'); // redirect to home
    } catch (err) {
      console.error("❌ Google login failed:", err.message);
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Login to your account</h2>

      <div className='form-container'>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='button' className='login-button' onClick={handleLogin}>
          Login
        </button>
        <button type='button' className='login-button google' onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
