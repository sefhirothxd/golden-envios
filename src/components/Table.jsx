import React, { useState, useContext } from 'react';
import { useFirestoreState } from '../hooks/useFirestore';
import { UserContext } from '../context/UserProvider';

const Table = ({ data, error, loading }) => {
  const { setModalContent, setModal } = useContext(UserContext);

  const getTrasf = (data) => {
    console.log(data);
    setModalContent(data);
    setModal(true);
  };

  const getStatus = (status) => {
    if (status === 'Pendiente') {
      return 'bg-green-300';
    } else if (status === 'Extornado') {
      return 'bg-red-300';
    } else if (status === 'Pagado') {
      return 'bg-white';
    }
  };
  const getLights = (status) => {
    if (status === 'Pendiente') {
      return 'bg-green-500';
    } else if (status === 'Extornado') {
      return 'bg-red-500';
    } else if (status === 'Pagado') {
      return 'bg-black';
    }
  };

  const loadingData = loading && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>;
  return (
    <>
      <div className=" overflow-x-auto w-full mt-5 shadow-md sm:rounded-xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Beneficiario
              </th>
              <th scope="col" className="px-6 py-3">
                Solicitante
              </th>
              <th scope="col" className="px-6 py-3">
                Origen
              </th>
              <th scope="col" className="px-6 py-3">
                Destino
              </th>
              <th scope="col" className="px-6 py-3">
                Asesor
              </th>
              <th scope="col" className="px-6 py-3">
                Monto
              </th>
              <th scope="col" className="px-6 py-3">
                Comisión
              </th>
              <th scope="col" className="px-6 py-3">
                OBS
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              {/* <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th> */}
            </tr>
          </thead>
          <tbody className="text-center">
            <div>{loadingData}</div>
            <div>{errorData}</div>
            {data?.length > 0 ? (
              data?.map(
                (
                  {
                    nanoid,
                    uid,
                    nomSolicitante,
                    apePaternoSoli,
                    apeMaternoSoli,
                    nomBeneficiario,
                    apePaternoBene,
                    apeMaternoBene,
                    estado,
                    origen,
                    asesor,
                    dniBene,
                    dniSoli,
                    fechaCreada,
                    destino,
                    monto,
                    comision,
                    obs,
                  },
                  index
                ) => (
                  <tr
                    onClick={() =>
                      getTrasf({
                        nanoid,
                        uid,
                        nomSolicitante,
                        apePaternoSoli,
                        apeMaternoSoli,
                        nomBeneficiario,
                        apePaternoBene,
                        apeMaternoBene,
                        estado,
                        origen,
                        asesor,
                        dniBene,
                        dniSoli,
                        fechaCreada,
                        destino,
                        monto,
                        comision,
                        obs,
                      })
                    }
                    key={index}
                    className={`${getStatus(
                      estado
                    )} cursor-pointer border-b text-black  dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black dark:text-white whitespace-nowrap"
                    >
                      {
                        // firebase Timestamp full .toLocaleTimeString() hora
                        fechaCreada.toDate().toLocaleDateString() +
                          ' ' +
                          fechaCreada.toDate().toLocaleTimeString()
                      }
                    </th>
                    <td className="px-6 py-4">{`${nomBeneficiario} ${apePaternoBene}`}</td>
                    <td className="px-6 py-4">{`${nomSolicitante} ${apePaternoSoli}`}</td>
                    <td className="px-6 py-4">{origen}</td>
                    <td className="px-6 py-4">{destino}</td>
                    <td className="px-6 py-4">{asesor}</td>
                    <td className="px-6 py-4">
                      S/
                      {monto.toLocaleString('en-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      S/
                      {comision.toLocaleString('en-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">{obs}</td>
                    <td className="px-6 py-4 flex items-center justify-center gap-1">
                      {estado}
                      <span
                        className={`${getLights(
                          estado
                        )} h-1 w-1 inline-block rounded-full`}
                      ></span>
                    </td>
                  </tr>
                )
              )
            ) : (
              <p className="py-4">'No hay Trasferencias para esta cuenta'</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
