import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useFirestoreState } from '../hooks/useFirestore';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userMore, setUserMore] = useState(false);
  const [transferenciasRecibidas, setTransferenciasRecibidas] = useState([]);
  const [trasferencias, setTrasferencias] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { getUserInfo, getDataZona, getData } = useFirestoreState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        const { apellidos, direccion, dni, nombres, rol, sede } =
          await getUserInfo(uid);
        setUser({
          email,
          uid,
          displayName,
          photoURL,
          apellidos,
          direccion,
          dni,
          nombres,
          rol,
          sede,
        });
        const res = await getData();
        console.log(res);
        setTrasferencias(res);
        const recibidad = await getDataZona(sede);
        setTransferenciasRecibidas(recibidad);
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

  const refreshTrasfereZona = async () => {
    const recibidad = await getDataZona(user.sede);
    setTransferenciasRecibidas(recibidad);
  };
  const refreshTrasferencias = async () => {
    const recibidad = await getData();
    setTrasferencias(recibidad);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        userMore,
        setUserMore,
        transferenciasRecibidas,
        trasferencias,
        modal,
        setModal,
        modalContent,
        setModalContent,
        refreshTrasfereZona,
        refreshTrasferencias,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
