import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import Table from '../components/TableOficinas';
import { useFirestoreState } from '../hooks/useFirestore';
const TransferenciasCreadas = () => {
  const { refreshTrasferencias, trasferencias } = useContext(UserContext);
  const { loading, error, getAllOffice, officesAll } = useFirestoreState();
  useEffect(() => {
    getAllOffice();
  }, []);
  return (
    <Table data={officesAll} loading={loading.getAllOffice} error={error} />
  );
};

export default TransferenciasCreadas;
