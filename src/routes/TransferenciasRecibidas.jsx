import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import Table from '../components/Table';
import { useFirestoreState } from '../hooks/useFirestore';
const TransferenciasRecibidas = () => {
  const { transferenciasRecibidas, user, refreshTrasfereZona } =
    useContext(UserContext);
  const {
    data,
    zonaData,
    loading,
    error,
    getData,
    addData,
    getUserInfo,
    dataUser,
    getDataZona,
  } = useFirestoreState();
  useEffect(() => {
    refreshTrasfereZona();
  }, []);

  return (
    <Table
      data={transferenciasRecibidas}
      loading={loading.getDataZona}
      error={error}
    />
  );
};

export default TransferenciasRecibidas;
