import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import { Button } from 'flowbite-react';
import 'react-datepicker/dist/react-datepicker.css';

const Table = ({ data, error, loading }) => {
  const { setModalContent, setModal } = useContext(UserContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [filter, setFilter] = useState(data);
  const [pageInitial, setPageInitial] = useState([]);
  const [pageFinal, setPageFinal] = useState(1);
  const handleFilter = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const { value } = e.target[0];

    const filtered = data.filter(
      (entry) =>
        entry.nombres.toLowerCase().includes(value) ||
        entry.dni === value ||
        entry.apellidos.toLowerCase().includes(value) === value
    );
    setFilter(filtered);
    console.log(filtered);
  };

  const getTrasf = (data) => {
    console.log(data);
    // setModalContent(data);
    // setModal(true);
  };

  const paginator = (items, current_page, per_page_items = 10) => {
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

  // const getStatus = (status) => {
  //   if (status === 'Pendiente') {
  //     return 'bg-green-300';
  //   } else if (status === 'Extornado') {
  //     return 'bg-red-300';
  //   } else if (status === 'Pagado') {
  //     return 'bg-white';
  //   }
  // };
  // const getLights = (status) => {
  //   if (status === 'Pendiente') {
  //     return 'bg-green-500';
  //   } else if (status === 'Extornado') {
  //     return 'bg-red-500';
  //   } else if (status === 'Pagado') {
  //     return 'bg-black';
  //   }
  // };

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
      <div className=" overflow-x-auto w-full mt-5 shadow-md sm:rounded-xl">
        <div className=" flex justify-center items-center w-full gap-7 my-2 ">
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
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellidos
              </th>
              <th scope="col" className="px-6 py-3">
                DNI
              </th>
              <th scope="col" className="px-6 py-3">
                Oficina
              </th>
              <th scope="col" className="px-6 py-3">
                Saldo Asignado
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre de usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
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
            {pageInitial?.data?.length > 0 &&
              pageInitial?.data?.map(
                (
                  {
                    nombres,
                    apellidos,
                    dni,
                    sede,
                    saldo,
                    email,
                    uid,
                    nanoid,
                    fechaCreada,
                    rol,
                  },
                  index
                ) => (
                  <tr
                    onClick={() =>
                      getTrasf({
                        nombres,
                        apellidos,
                        dni,
                        sede,
                        saldo,
                        email,
                        uid,
                        nanoid,
                        fechaCreada,
                      })
                    }
                    key={index}
                    className={`bg-white cursor-pointer border-b text-black  dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600`}
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
                    <td className="px-6 py-4">{nombres}</td>
                    <td className="px-6 py-4">{apellidos}</td>
                    <td className="px-6 py-4">{dni}</td>
                    <td className="px-6 py-4">{sede}</td>
                    <td className="px-6 py-4">
                      S/
                      {saldo.toLocaleString('en-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {email.slice(0, email.indexOf('@'))}
                    </td>
                    <td className="px-6 py-4">{rol}</td>
                  </tr>
                )
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
    </>
  );
};

export default Table;
