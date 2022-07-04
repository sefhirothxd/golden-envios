import {
  collection,
  getDocs,
  doc,
  query,
  where,
  Timestamp,
  setDoc,
  orderBy,
} from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { nanoid } from 'nanoid';

export const useFirestoreState = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});
  const uid = auth.currentUser.uid;

  console.log(Timestamp.now());

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
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const addData = async ({
    asesor,
    beneficiario,
    comision,
    estado,
    monto,
    obs,
    origen,
    solicitante,
  }) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newData = {
        asesor,
        beneficiario,
        comision,
        estado,
        monto,
        obs,
        origen,
        solicitante,
        uid,
        fechaCreada: Timestamp.now(),
      };
      const docRef = doc(db, 'transferencias', nanoid(6));
      await setDoc(docRef, newData);
      setData([...data, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const addUserRegister = async (item) => {
    console.log('SOY LO QUE MANDAS AL REGISTER', item);
    try {
      setLoading((prev) => ({ ...prev, addOrdersFire: true }));
      const newData = {
        ...item,
        fechaCreada: Timestamp.now(),
        rol: 'asesor',
      };
      const docRef = doc(db, 'registerUser', nanoid(6));
      await setDoc(docRef, newData);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addOrdersFire: false }));
    }
  };

  return { data, error, loading, getData, addData };
};
