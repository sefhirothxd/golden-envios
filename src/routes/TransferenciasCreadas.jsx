import React, { useEffect } from 'react';
import Table from '../components/Table';
import { useFirestoreState } from '../hooks/useFirestore';
const TransferenciasCreadas = () => {
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
    getData();
  }, []);
  return <Table data={data} loading={loading.getData} error={error} />;
};

export default TransferenciasCreadas;
