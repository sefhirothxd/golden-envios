import {
  collection,
  getDocs,
  doc,
  query,
  where,
  Timestamp,
  setDoc,
  deleteDoc,
  orderBy,
  updateDoc,
} from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { nanoid } from 'nanoid';

export const useFirestoreState = () => {
  const [data, setData] = useState([]);
  const [zonaData, setZonaData] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [allUser, setAllUser] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});
  const uid = auth?.currentUser?.uid;

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const q = query(
        collection(db, 'transferencias'),
        orderBy('fechaCreada', 'desc'),
        where('uid', '==', uid)
      );
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map((doc) => doc.data());
      setData(datos);
      return datos;
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };
  const getDataZona = async (e) => {
    try {
      setLoading((prev) => ({ ...prev, getDataZona: true }));
      const q = query(
        collection(db, 'transferencias'),
        // orderBy('fechaCreada', 'desc'),
        where('destino', '==', e)
      );
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map((doc) => doc.data());
      console.log(datos);
      setZonaData(datos);
      return datos;
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getDataZona: false }));
    }
  };
  const getAllUsers = async () => {
    try {
      setLoading((prev) => ({ ...prev, getAllUsers: true }));
      const q = query(collection(db, 'registerUser'));
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map((doc) => doc.data());
      setAllUser(datos);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getAllUsers: false }));
    }
  };
  const getUserInfo = async (u) => {
    console.log(u);
    try {
      setLoading((prev) => ({ ...prev, getUserInfo: true }));
      const q = await query(
        collection(db, 'registerUser'),
        where('uid', '==', u || uid)
      );
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map((doc) => doc.data());
      console.log(datos[0]);
      setDataUser(datos[0]);
      return datos[0];
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getUserInfo: false }));
    }
  };

  const addData = async (obj) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newData = {
        ...obj,
        nanoid: nanoid(12),
        fechaCreada: Timestamp.now(),
        fechaCierre: Timestamp.now(),
      };
      const docRef = doc(db, 'transferencias', newData.nanoid);
      await setDoc(docRef, newData);
      setData([...data, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };
  const updateEstate = async (uid, estate) => {
    try {
      setLoading((prev) => ({ ...prev, updateEstate: true }));
      const docRef = doc(db, 'transferencias', uid);
      await updateDoc(docRef, { estado: estate, fechaCierre: Timestamp.now() });
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, updateEstate: false }));
    }
  };

  const updateData = async (uid, nuevoSaldo) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, 'registerUser', uid);
      await updateDoc(docRef, { saldo: nuevoSaldo });
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };
  const addUserRegister = async (item, id) => {
    try {
      setLoading((prev) => ({ ...prev, addUserRegister: true }));
      const newData = {
        ...item,
        fechaCreada: Timestamp.now(),
        rol: 'asesor',
        uid: id,
        nanoid: nanoid(12),
      };
      const docRef = doc(db, 'registerUser', newData.nanoid);
      await setDoc(docRef, newData);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addUserRegister: false }));
    }
  };

  return {
    data,
    error,
    loading,
    dataUser,
    setDataUser,
    getData,
    addData,
    addUserRegister,
    getUserInfo,
    getDataZona,
    getAllUsers,
    allUser,
    zonaData,
    updateEstate,
    updateData,
  };
};
