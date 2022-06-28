import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export const useFirestoreState = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});
  const uid = auth.currentUser.uid;

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const q = query(
        collection(db, 'transferencias'),
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

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newData = { nanoid: nanoid(6), origin: url, uid };
      const docRef = doc(db, 'urls', newData.nanoid);
      await setDoc(docRef, newData);
      setData([...data, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  return { data, error, loading, getData, addData };
};
