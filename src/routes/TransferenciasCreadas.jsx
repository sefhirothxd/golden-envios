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
    console.log(data);
    getData();
    getUserInfo();
  }, []);
  return <Table data={data} loading={loading} error={error} />;
};

export default TransferenciasCreadas;
