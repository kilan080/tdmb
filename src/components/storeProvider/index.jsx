'use client';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { auth } from '../../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function StoreProvider({ children }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.email);
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default StoreProvider;
