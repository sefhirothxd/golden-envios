import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useFirestoreState } from '../hooks/useFirestore';
import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userMore, setUserMore] = useState(false);
  const [transferenciasRecibidas, setTransferenciasRecibidas] = useState([]);
  const [trasferencias, setTrasferencias] = useState([]);
  const [paidFilter, setPaidFilter] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { getUserInfo, getDataZona, getData } = useFirestoreState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        const { apellidos, direccion, dni, nombres, rol, sede, saldo, nanoid } =
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
          saldo,
          nanoid,
        });
        const res = await getData();
        setTrasferencias(res);
        const recibidad = await getDataZona(sede);
        setTransferenciasRecibidas(recibidad);
        onSnapshot(collection(db, 'registerUser'), (snapshot) =>
          setUser(
            snapshot.docs
              .map((doc) => doc.data())
              .filter((d) => d.uid === user.uid)[0]
          )
        );
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
  const pagadasFilter = async () => {
    const recibidad = await getData();
    const filter = recibidad.filter((filter) => filter.estado === 'Pagado');
    setPaidFilter(filter);
  };
  const refreshUser = async () => {
    const { saldo } = await getUserInfo(user.uid);
    setUser({ ...user, saldo });
  };

  return (
    <UserContext.Provider
      value={{
        paidFilter,
        pagadasFilter,
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
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
