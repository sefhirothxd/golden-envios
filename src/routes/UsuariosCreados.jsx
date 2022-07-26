import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import Table from '../components/TableUsers';
import { useFirestoreState } from '../hooks/useFirestore';
const TransferenciasCreadas = () => {
  const { refreshTrasferencias, trasferencias } = useContext(UserContext);
  const {
    data,
    loading,
    error,
    getData,
    addData,
    getUserInfo,
    dataUser,
    getDataZona,
    getAllUsers,
    allUser,
  } = useFirestoreState();
  useEffect(() => {
    getAllUsers();
  }, []);
  return <Table data={allUser} loading={loading.getAllUsers} error={error} />;
};

export default TransferenciasCreadas;
