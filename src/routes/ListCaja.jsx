import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import Table from '../components/Table';
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
  } = useFirestoreState();
  useEffect(() => {
    refreshTrasferencias();
  }, []);
  return <Table data={trasferencias} loading={loading.getData} error={error} />;
};

export default TransferenciasCreadas;
