// 'use client';

// import React, { useEffect, useState } from 'react';
// import './login.css';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
// import { analytics, auth, logEvent } from '../../../firebase/firebase';
// import { onAuthStateChanged } from 'firebase/auth'; 
// import {
//   signInWithRedirect,
//   getRedirectResult,
//   signInWithEmailAndPassword,
//   setPersistence,
//   browserSessionPersistence,
//   signInWithPopup,
//   GoogleAuthProvider
// } from 'firebase/auth';

// export default function Page() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [authInitialized, setAuthInitialized] = useState(false);

//   // Initialize auth and set persistence
//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         await setPersistence(auth, browserSessionPersistence);
//         setAuthInitialized(true);
//       } catch (error) {
//         console.error('Failed to set persistence:', error);
//         setAuthInitialized(true); // Still allow the app to continue
//       }
//     };
    
//     initAuth();
//   }, []);

//   // Handle authentication state changes
//   useEffect(() => {
//     if (!authInitialized) return;

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log('User signed in:', user.uid);
//         toast.success('Successfully logged in');
//         router.push('/');
//       }
//     });

//     return () => unsubscribe();
//   }, [router, authInitialized]);

//   // Handle redirect result for Google login
//   useEffect(() => {
//     if (!authInitialized) return;

//     const handleRedirectResult = async () => {
//       try {
//         const result = await getRedirectResult(auth);
//         if (result?.user) {
//           console.log('Google redirect login successful:', result.user.uid);
//           logEvent(analytics, 'login', { method: 'google_redirect' });
//           // The onAuthStateChanged will handle the redirect
//         }
//       } catch (error) {
//         console.error('Google redirect error:', error);
//         toast.error(error.message || 'Google login failed');
//       }
//     };

//     handleRedirectResult();
//   }, [authInitialized]);

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       toast.error('Please fill in both email and password');
//       return;
//     }

//     if (!email.includes('@')) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log('Email login successful:', userCredential.user.uid);
//       logEvent(analytics, 'login', { method: 'email_password' });
//       // onAuthStateChanged will handle the redirect
//     } catch (error) {
//       console.error('Email login failed:', error);
      
//       // Handle specific Firebase auth errors
//       let errorMessage = 'Login failed';
//       switch (error.code) {
//         case 'auth/user-not-found':
//           errorMessage = 'No account found with this email';
//           break;
//         case 'auth/wrong-password':
//           errorMessage = 'Incorrect password';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address';
//           break;
//         case 'auth/too-many-requests':
//           errorMessage = 'Too many failed attempts. Try again later';
//           break;
//         case 'auth/user-disabled':
//           errorMessage = 'Account has been disabled';
//           break;
//         default:
//           errorMessage = error.message || 'Login failed';
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setIsLoading(true);
    
//     try {
//       const provider = new GoogleAuthProvider();
//       provider.setCustomParameters({ 
//         prompt: 'select_account' 
//       });
      
//       // Detect if user is on mobile
//       const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
//       if (isMobile) {
//         // Use redirect for mobile devices
//         await signInWithRedirect(auth, provider);
//         // The redirect will happen, so code below won't execute
//       } else {
//         // Use popup for desktop
//         const result = await signInWithPopup(auth, provider);
//         console.log('Google popup login successful:', result.user.uid);
//         logEvent(analytics, 'login', { method: 'google_popup' });
//         // onAuthStateChanged will handle the redirect
//       }
//     } catch (error) {
//       console.error('Google login failed:', error);
      
//       let errorMessage = 'Google login failed';
//       switch (error.code) {
//         case 'auth/popup-closed-by-user':
//           errorMessage = 'Login cancelled';
//           break;
//         case 'auth/popup-blocked':
//           errorMessage = 'Popup blocked. Please allow popups for this site';
//           break;
//         case 'auth/cancelled-popup-request':
//           errorMessage = 'Login cancelled';
//           break;
//         default:
//           errorMessage = error.message || 'Google login failed';
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Don't render the form until auth is initialized
//   if (!authInitialized) {
//     return (
//       <div className="login-container">
//         <div>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Login to your account</h2>

//       <form className="form-container" onSubmit={handleEmailLogin}>
//         <div className="form-group">
//           <label className="form-label">Email</label>
//           <input
//             className="form-input"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="email"
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">Password</label>
//           <input
//             className="form-input"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <button 
//           type="submit" 
//           className="login-button" 
//           disabled={isLoading}
//         >
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>

//         <button
//           type="button"
//           className="login-button google"
//           onClick={handleGoogleLogin}
//           disabled={isLoading}
//         >
//           {isLoading ? 'Logging in...' : 'Login with Google'}
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import './login.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { auth, googleProvider, safeLogEvent } from '../../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth'; 
import {
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState([]);

  // Debug logging function
  const addDebug = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const debugEntry = `[${timestamp}] ${message}`;
    console.log(debugEntry, data || '');
    setDebugInfo(prev => [...prev.slice(-9), debugEntry]);
  };

  // Test Firebase connection on mount
  useEffect(() => {
    addDebug('🚀 Component mounted, checking Firebase...');
    
    if (!auth) {
      addDebug('❌ Firebase auth not available');
      return;
    }
    
    addDebug('✅ Firebase auth available');
    addDebug(`Project ID: ${auth.app.options.projectId || 'Not found'}`);
    addDebug(`Auth Domain: ${auth.app.options.authDomain || 'Not found'}`);
    
    // Test auth state
    addDebug(`Current user: ${auth.currentUser ? auth.currentUser.email : 'None'}`);
  }, []);

  // Monitor auth state changes
  useEffect(() => {
    addDebug('Setting up auth state listener...');
    
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        if (user) {
          addDebug(`✅ User authenticated: ${user.email}`);
          addDebug(`Provider: ${user.providerData[0]?.providerId || 'email'}`);
          toast.success(`Welcome back, ${user.email.split('@')[0]}!`);
          
          // Small delay to ensure the toast shows before redirect
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          addDebug('❌ No authenticated user');
        }
      },
      (error) => {
        addDebug('❌ Auth state error:', error.message);
        console.error('Auth state error:', error);
      }
    );

    return () => {
      addDebug('Cleaning up auth listener');
      unsubscribe();
    };
  }, [router]);

  // Handle redirect results (for mobile Google login)
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        addDebug('Checking for redirect result...');
        const result = await getRedirectResult(auth);
        
        if (result && result.user) {
          addDebug('✅ Google redirect successful');
          addDebug(`User: ${result.user.email}`);
          safeLogEvent('login', { method: 'google_redirect' });
        } else {
          addDebug('No redirect result found');
        }
      } catch (error) {
        addDebug('❌ Redirect error:', error.message);
        addDebug(`Error code: ${error.code}`);
        
        let errorMessage = 'Google login failed';
        if (error.code === 'auth/account-exists-with-different-credential') {
          errorMessage = 'Account exists with different sign-in method';
        } else if (error.code === 'auth/popup-blocked') {
          errorMessage = 'Popup was blocked by browser';
        }
        
        toast.error(errorMessage);
      }
    };

    // Only check for redirect result after a small delay to ensure Firebase is ready
    const timer = setTimeout(handleRedirect, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }

    if (!email.includes('@') || email.length < 5) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    addDebug(`Attempting email login: ${email}`);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      addDebug('✅ Email login successful');
      addDebug(`UID: ${userCredential.user.uid}`);
      
      safeLogEvent('login', { method: 'email_password' });
      
      // Clear form
      setEmail('');
      setPassword('');
      
    } catch (error) {
      addDebug('❌ Email login failed:', error.message);
      addDebug(`Error code: ${error.code}`);
      
      let errorMessage = 'Login failed';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = error.message || 'Login failed';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGooglePopup = async () => {
    setIsLoading(true);
    addDebug('Attempting Google popup login...');
    
    try {
      addDebug('Creating popup...');
      const result = await signInWithPopup(auth, googleProvider);
      
      addDebug('✅ Google popup login successful');
      addDebug(`User: ${result.user.email}`);
      addDebug(`Provider: ${result.providerId}`);
      
      safeLogEvent('login', { method: 'google_popup' });
      
    } catch (error) {
      addDebug('❌ Google popup failed:', error.message);
      addDebug(`Error code: ${error.code}`);
      
      let errorMessage = 'Google login failed';
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login window was closed';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup blocked. Please allow popups and try again';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Login was cancelled';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        case 'auth/internal-error':
          errorMessage = 'An internal error occurred. Please try again';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email using a different sign-in method';
          break;
        default:
          errorMessage = error.message || 'Google login failed';
      }
      
      if (error.code !== 'auth/popup-closed-by-user') {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearDebug = () => {
    setDebugInfo([]);
    addDebug('Debug log cleared');
  };

  const testFirebase = async () => {
    addDebug('🧪 Testing Firebase connection...');
    
    try {
      // Test if Firebase is properly initialized
      await auth.authStateReady();
      addDebug('✅ Firebase Auth is ready');
      
      // Check current user
      const user = auth.currentUser;
      addDebug(`Current user: ${user ? user.email : 'None'}`);
      
      // Test configuration
      const config = auth.app.options;
      addDebug(`Project: ${config.projectId}`);
      addDebug(`Auth Domain: ${config.authDomain}`);
      
      toast.success('Firebase connection test passed!');
    } catch (error) {
      addDebug('❌ Firebase test failed:', error.message);
      toast.error('Firebase connection test failed');
    }
  };

  return (
    <div className="login-container">

      <form className="form-container" onSubmit={handleEmailLogin}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={isLoading}
            required
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
            disabled={isLoading}
            required
            minLength={6}
          />
        </div>

        <button 
          type="submit" 
          className="login-button" 
          disabled={isLoading}
        >
          {isLoading ? '🔄 Logging in...' : 'Login with Email'}
        </button>

        <button
          type="button"
          className="login-button google"
          onClick={handleGooglePopup}
          disabled={isLoading}
        >
          {isLoading ? '🔄 Logging in...' : 'Login with Google'}
        </button>
      </form>
    </div>
  );
}