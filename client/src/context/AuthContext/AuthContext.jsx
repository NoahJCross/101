import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErr(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setErr(error.message);
    }
  };

  const register = async ({ firstName, lastName, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        firstName,
        lastName,
        email,
      });
      return userCredential.user;
    } catch (error) {
      let errorMessage = "Error registering user";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email address is already in use";
      }
      setErr(error.message);
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    err,
    setErr,
  };

  return <FirebaseContext.Provider value={value}>{!loading && children}</FirebaseContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a FirebaseProvider");
  }
  return context;
};
