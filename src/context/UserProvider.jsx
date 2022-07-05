import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [transferencias, setTransferencias] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        setUser({ email, uid, displayName, photoURL });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const registerUser = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logoutUser = () => signOut(auth);
  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
