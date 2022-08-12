import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import Table from '../components/Table';
import { useFirestoreState } from '../hooks/useFirestore';
const Liquidaciones = () => {
  const { refreshTrasferencias, trasferencias, paidFilter, pagadasFilter } =
    useContext(UserContext);
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
    pagadasFilter();
  }, []);
  return <Table data={paidFilter} loading={loading.getData} error={error} />;
};

export default Liquidaciones;
