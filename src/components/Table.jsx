import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'flowbite-react';
import 'react-datepicker/dist/react-datepicker.css';

const Table = ({ data, error, loading }) => {
  const { setModalContent, setModal } = useContext(UserContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  let { pathname } = useLocation();
  const [filter, setFilter] = useState(data);
  const [pageInitial, setPageInitial] = useState([]);
  const [pageFinal, setPageFinal] = useState(1);

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

  const resumenCuentas = () => {
    const girosSuma = filter.reduce((acc, item) => {
      return acc + item.monto;
    }, 0);
    const ComisionSuma = filter.reduce((acc, item) => {
      return acc + item.comision;
    }, 0);
    const TotalSuma = girosSuma + ComisionSuma;
    return { girosSuma, ComisionSuma, TotalSuma };
  };

  const paginator = (items, current_page, per_page_items) => {
    console.log('aqui toy');
    let page = current_page || pageFinal,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,
      paginatedItems = items?.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items?.length / per_page);
    setPageInitial({
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items?.length,
      total_pages: total_pages,
      data: paginatedItems,
    });
  };

  const exportExcel = () => {
    const fileType = 'xlsx';
    const newData = filter.map((data) => {
      return {
        ...data,
        fechaCierre: data.fechaCierre.toDate(),
        horaCierre: data.fechaCierre.toDate().toLocaleTimeString(),
        fechaCreada: data.fechaCreada.toDate(),
        horaCreada: data.fechaCreada.toDate().toLocaleTimeString(),
      };
    });
    console.log(newData);
    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'Trasferencias.xlsx');
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
    paginator(data, 1);
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
      <div className=" overflow-x-auto  w-full mt-5 shadow-md sm:rounded-xl">
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
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <th>{loadingData}</th>
            </tr>
            <tr>
              <th>{errorData}</th>
            </tr>
            {pageInitial?.data?.length > 0 ? (
              pageInitial?.data?.map(
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
              <tr className="h-14 relative text-center text-md text-black font-bold w-full ">
                <td className="w-full absolute -left-56 md:left-0 top-5">
                  No hay Trasferencias disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-5 px-4 sm:px-0">
        <Button
          disabled={pageInitial.pre_page === null ? true : false}
          onClick={() => paginator(data, pageInitial.pre_page)}
        >
          Anterior
        </Button>

        <Button
          disabled={pageInitial.next_page === null ? true : false}
          onClick={() => paginator(data, pageInitial.next_page)}
        >
          Siguiente
        </Button>
      </div>
      {pathname === '/liquidaciones' && (
        <div className="absolute  sm:bottom-1/4 bottom-5 flex-col-reverse gap-3 sm:flex-row right-0 lg:right-20 flex items-center justify-evenly w-full">
          <button
            onClick={exportExcel}
            className="bg-celeste p-3 rounded-lg  w-48 text-white text-xl  "
            type="submit"
          >
            Export Excel
          </button>
          <div>
            <div className="flex justify-between items-center gap-2">
              <p className="font-semibold">Giros:</p>
              <p>S/. {resumenCuentas().girosSuma}</p>
            </div>
            <div className="flex justify-between  items-center gap-2">
              <p className="font-semibold">Comisiones:</p>
              <p>S/. {resumenCuentas().ComisionSuma}</p>
            </div>
            <div className="flex justify-between  items-center gap-2">
              <p className="font-semibold">Total:</p>
              <p>S/. {resumenCuentas().TotalSuma}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
