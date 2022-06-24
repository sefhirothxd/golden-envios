import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createContext, useState } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  return (
    <UserContext.Provider value={{ user, setUser, registerUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
