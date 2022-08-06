import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import TableListHistory from '../components/TableListHistory';
import { useFirestoreState } from '../hooks/useFirestore';
const TransferenciasCreadas = () => {
  const { loading, error, getAllHistoryBox, officesHistoryAll } =
    useFirestoreState();
  useEffect(() => {
    getAllHistoryBox();
  }, []);
  return (
    <TableListHistory
      data={officesHistoryAll}
      loading={loading.getAllHistoryBox}
      error={error}
    />
  );
};

export default TransferenciasCreadas;
