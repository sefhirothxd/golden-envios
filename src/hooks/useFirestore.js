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
import { limit, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { nanoid } from 'nanoid';

export const useFirestoreState = () => {
  const [data, setData] = useState([]);
  const [offices, setOffices] = useState([]);
  const [historyMoney, setHistoryMoney] = useState([]);
  const [officesAll, setOfficesALL] = useState([]);
  const [officesHistoryAll, setOfficesHistoryALL] = useState([]);
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
        orderBy('fechaCreada', 'desc')
        // limit(2)
        // where('uid', '==', uid)
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
      const q = query(
        collection(db, 'registerUser'),
        orderBy('fechaCreada', 'desc')
      );
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
  const addOffice = async (obj) => {
    try {
      setLoading((prev) => ({ ...prev, addOffice: true }));
      const newData = {
        ...obj,
        nanoid: nanoid(12),
        fechaCreada: Timestamp.now(),
      };
      const docRef = doc(db, 'oficinas', newData.nanoid);
      await setDoc(docRef, newData);
      setOffices([...offices, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addOffice: false }));
    }
  };
  const getAllOffice = async () => {
    try {
      setLoading((prev) => ({ ...prev, getAllOffice: true }));
      const q = query(
        collection(db, 'oficinas'),
        orderBy('fechaCreada', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map((doc) => doc.data());
      setOfficesALL(datos);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getAllOffice: false }));
    }
  };
  const getAllHistoryBox = async () => {
    try {
      setLoading((prev) => ({ ...prev, getAllHistoryBox: true }));
      const q = query(
        collection(db, 'historialCaja'),
        orderBy('fechaCreada', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map((doc) => doc.data());
      setOfficesHistoryALL(datos);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getAllHistoryBox: false }));
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
  //agregar saldo a usuarios
  const updateData = async (uid, nuevoSaldo, anterioSaldo) => {
    console.log(uid, nuevoSaldo, anterioSaldo);
    const newData = anterioSaldo + nuevoSaldo;
    console.log(newData);
    console.log(typeof newData);

    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, 'registerUser', uid);
      await updateDoc(docRef, { saldo: newData });
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };
  const updateDataRestarSaldo = async (uid, nuevoSaldo) => {
    console.log(uid, nuevoSaldo);
    const newData = nuevoSaldo;
    console.log(newData);
    console.log(typeof newData);
    try {
      setLoading((prev) => ({ ...prev, updateDataRestarSaldo: true }));
      const docRef = doc(db, 'registerUser', uid);
      await updateDoc(docRef, { saldo: newData });
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, updateDataRestarSaldo: false }));
    }
  };

  //genera un historial al asignar saldo al usuario

  const addhostoryMoney = async (obj) => {
    try {
      setLoading((prev) => ({ ...prev, addhostoryMoney: true }));
      const newData = {
        ...obj,
        nanoid: nanoid(12),
        fechaCreada: Timestamp.now(),
      };
      const docRef = doc(db, 'historialCaja', newData.nanoid);
      await setDoc(docRef, newData);
      setHistoryMoney([...historyMoney, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addhostoryMoney: false }));
    }
  };

  const addUserRegister = async (item, id) => {
    try {
      setLoading((prev) => ({ ...prev, addUserRegister: true }));
      const newData = {
        ...item,
        fechaCreada: Timestamp.now(),
        rol: 'asesor',
        saldo: 0,
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
    updateDataRestarSaldo,
    getAllHistoryBox,
    officesHistoryAll,
    addhostoryMoney,
    officesAll,
    getAllOffice,
    addOffice,
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
