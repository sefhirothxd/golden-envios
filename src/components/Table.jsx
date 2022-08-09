import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import DatePicker from 'react-datepicker';
import { Button } from 'flowbite-react';
import 'react-datepicker/dist/react-datepicker.css';

const Table = ({ data, error, loading }) => {
  const { setModalContent, setModal } = useContext(UserContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [filter, setFilter] = useState(data);

  const handleFilter = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const { value } = e.target[0];

    const filtered = data.filter(
      (entry) =>
        entry.nomSolicitante.toLowerCase().includes(value) ||
        entry.dniSoli === value
    );
    // const filtered = data.filter((item) =>
    //   item.nomBeneficiario.toLowerCase().includes(value.toLowerCase())
    // );
    setFilter(filtered);
    console.log(filtered);
  };

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

  const filterDateRage = (update) => {
    if (update[1] === null) {
      return;
    }
    const filtered = data.filter((item) => {
      const date = new Date(item.fechaCreada.toDate());
      const start = new Date(update[0]);
      const end = new Date(update[1]);
      const format =
        date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      console.log('soy el array formateado ', Date.parse(format));
      const format2 = Date.parse(start);
      console.log('soy lo seleccionado formateado ', format2);
      const format3 = Date.parse(end);
      console.log('soy lo seleccionado formateado end', format3);
      return Date.parse(format) >= format2 && Date.parse(format) <= format3;
    });
    console.log(filtered, 'soy el filtro');
    setFilter(filtered);
  };

  useEffect(() => {
    setFilter(data);
  }, [data]);
  useEffect(() => {
    if (startDate === null && endDate === null) {
      setFilter(data);
    }
  }, [dateRange]);
  const loadingData = loading && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>;
  return (
    <>
      <div className=" overflow-x-auto w-full mt-5 shadow-md sm:rounded-xl">
        <div className=" flex justify-center items-center w-full gap-7 my-2 ">
          <div>
            <DatePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                filterDateRage(update);
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="Buscar por fecha"
            />
          </div>
          <form
            className="flex justify-center items-center gap-5"
            onSubmit={handleFilter}
          >
            <input
              type="text"
              placeholder="Buscar por Nombre o DNI"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <Button type="submit">Buscar</Button>
          </form>
        </div>
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
            {filter?.length > 0 ? (
              filter?.map(
                (
                  {
                    nanoid,
                    uid,
                    nomSolicitante,
                    soliApellidos,
                    nomBeneficiario,
                    beneApellidos,
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
                        soliApellidos,
                        nomBeneficiario,
                        beneApellidos,
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
                    <td className="px-6 py-4">
                      {nomBeneficiario} {beneApellidos}
                    </td>
                    <td className="px-6 py-4">
                      {nomSolicitante} {soliApellidos}
                    </td>
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
