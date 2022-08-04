import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import X from '../assets/img/x.svg';
import Logo from '../assets/img/logoLogin2.png';
import { NavLink, Link } from 'react-router-dom';
const sideBar = ({ bar, setBar }) => {
  const [showTrans, setShowTrans] = useState(false);
  const [showHabi, setShowHabi] = useState(false);
  const [showRece, setShowRece] = useState(false);
  const [showCuentas, setShowCuentas] = useState(false);
  const [showCaja, setShowCaja] = useState(false);
  const [showAdmini, setAdmini] = useState(false);

  const { user } = useContext(UserContext);

  const handleCordion = (e) => {
    const probando = {
      1: () => {
        setShowTrans(!showTrans);
        setShowHabi(false);
        setShowRece(false);
        setShowCuentas(false);
        setShowCaja(false);
        setAdmini(false);
      },
      2: () => {
        setShowTrans(false);
        setShowHabi(!showHabi);
        setShowRece(false);
        setShowCuentas(false);
        setShowCaja(false);
        setAdmini(false);
      },
      3: () => {
        setShowTrans(false);
        setShowHabi(false);
        setShowRece(!showRece);
        setShowCuentas(false);
        setShowCaja(false);
        setAdmini(false);
      },
      4: () => {
        setShowTrans(false);
        setShowHabi(false);
        setShowRece(false);
        setShowCuentas(!showCuentas);
        setShowCaja(false);
        setAdmini(false);
      },
      5: () => {
        setShowTrans(false);
        setShowHabi(false);
        setShowRece(false);
        setShowCuentas(false);
        setShowCaja(!showCaja);
        setAdmini(false);
      },
      6: () => {
        setShowTrans(false);
        setShowHabi(false);
        setShowRece(false);
        setShowCuentas(false);
        setShowCaja(false);
        setAdmini(!showAdmini);
      },
    };
    probando[e]();
  };

  return (
    <aside className={!bar ? 'barSide' : 'barSide2'} aria-label="Sidebar">
      <div className="overflow-y-auto h-full flex relative  items-center flex-col w-72  py-4  bg-sideblue rounded-r-3xl dark:bg-gray-800">
        <button onClick={() => setBar(!bar)}>
          <img
            src={X}
            className="h-6 w-auto absolute right-5 920:hidden"
            alt="aspa"
          />
        </button>
        <Link to="/">
          <img src={Logo} className="mt-10" alt="logo golden fast" />
        </Link>
        <hr className="bg-white  w-full mt-7 mb-7" />
        <ul className="space-y-2 w-full ">
          <li>
            <button
              type="button"
              onClick={(e) => handleCordion(1)}
              className="flex items-center py-2 px-5 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                className="flex-shrink-0 w-6 h-6  text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 15L19 10L14 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10H7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="flex-1 ml-3 text-left whitespace-nowrap"
                sidebar-toggle-item=""
              >
                Transferencias
              </span>
              <svg
                sidebar-toggle-item=""
                className={
                  showTrans
                    ? 'w-6 h-6 transform rotate-180 transition duration-300'
                    : 'w-6 h-6 transition duration-300'
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <ul
              id="dropdown-example"
              className={
                showTrans
                  ? 'inline-block py-2 space-y-2 w-full '
                  : 'hidden py-2 space-y-2 '
              }
            >
              <li>
                <NavLink
                  to="/crearTransferencias"
                  className="flex cursor-pointer items-center p-2 pl-14 w-full text-xl font-normal text-gray-300 rounded-lg transition duration-75 group   dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Crear transferencias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/TransferenciasCreadas"
                  className="flex cursor-pointer items-center p-2 pl-14 w-full text-xl font-normal text-gray-300 rounded-lg transition duration-75 group   dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Transferencias creadas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/TransferenciasRecibidas"
                  className="flex cursor-pointer items-center p-2 pl-14 w-full text-xl font-normal text-gray-300 rounded-lg transition duration-75 group   dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Transferencias recibidas
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              onClick={
                user.rol === 'administrador' ? () => handleCordion(2) : ''
              }
              className="flex items-center py-2 px-5 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                className="flex-shrink-0 w-6 h-6  text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9319 3L19.9319 1L14.4319 6.5M17.9319 3L20.9319 6L17.4319 9.5L14.4319 6.5M17.9319 3L10.3219 10.61M10.3219 10.61C10.8383 11.1195 11.2487 11.726 11.5297 12.3948C11.8106 13.0635 11.9565 13.7813 11.9589 14.5066C11.9614 15.232 11.8203 15.9507 11.5438 16.6213C11.2674 17.2919 10.861 17.9012 10.3481 18.4141C9.83515 18.9271 9.22584 19.3334 8.55522 19.6099C7.8846 19.8864 7.16591 20.0275 6.44055 20.025C5.71518 20.0226 4.99746 19.8767 4.32871 19.5958C3.65995 19.3148 3.05338 18.9043 2.54392 18.388C1.54205 17.3507 0.987677 15.9614 1.00021 14.5193C1.01274 13.0772 1.59117 11.6977 2.61091 10.678C3.63066 9.65825 5.01013 9.07982 6.45221 9.06729C7.89429 9.05476 9.2836 9.60913 10.3209 10.611L10.3219 10.61ZM10.3219 10.61L14.4319 6.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="flex-1 ml-3 text-left whitespace-nowrap"
                sidebar-toggle-item=""
              >
                Habilitaciones
              </span>
              <svg
                sidebar-toggle-item=""
                className={
                  showHabi
                    ? 'w-6 h-6 transform rotate-180 transition duration-300'
                    : 'w-6 h-6 transition duration-300'
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {user.rol === 'administrador' && (
              <ul
                id="dropdown-example"
                className={
                  showHabi
                    ? 'inline-block py-2 space-y-2 w-full'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <NavLink
                    to="/envioCaja"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Envio de caja
                  </NavLink>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Lista de Envios
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              onClick={
                user.rol === 'administrador' ? () => handleCordion(3) : ''
              }
              className="flex items-center py-2 px-5 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                className="flex-shrink-0 w-6 h-6  text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 15L13 10L8 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 10H1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="flex-1 ml-3 text-left whitespace-nowrap"
                sidebar-toggle-item=""
              >
                Recepciones
              </span>
              <svg
                sidebar-toggle-item=""
                className={
                  showRece
                    ? 'w-6 h-6 transform rotate-180 transition duration-300'
                    : 'w-6 h-6 transition duration-300'
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {user.rol === 'administrador' && (
              <ul
                id="dropdown-example"
                className={
                  showRece
                    ? 'inline-block py-2 space-y-2'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              onClick={
                user.rol === 'administrador' ? () => handleCordion(4) : ''
              }
              className="flex items-center py-2 px-5 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                className="flex-shrink-0 w-6 h-6  text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 7C14.9706 7 19 5.65685 19 4C19 2.34315 14.9706 1 10 1C5.02944 1 1 2.34315 1 4C1 5.65685 5.02944 7 10 7Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 11C19 12.66 15 14 10 14C5 14 1 12.66 1 11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 4V18C1 19.66 5 21 10 21C15 21 19 19.66 19 18V4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="flex-1 ml-3 text-left whitespace-nowrap"
                sidebar-toggle-item=""
              >
                Cuentas
              </span>
              <svg
                sidebar-toggle-item=""
                className={
                  showCuentas
                    ? 'w-6 h-6 transform rotate-180 transition duration-300'
                    : 'w-6 h-6 transition duration-300'
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {user.rol === 'administrador' && (
              <ul
                id="dropdown-example"
                className={
                  showCuentas
                    ? 'inline-block py-2 space-y-2'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              onClick={
                user.rol === 'administrador' ? () => handleCordion(5) : ''
              }
              className="flex items-center py-2 px-5 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                className="flex-shrink-0 w-6 h-6  text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                viewBox="0 0 14 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1V23"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5H4.5C3.57174 5 2.6815 5.36875 2.02513 6.02513C1.36875 6.6815 1 7.57174 1 8.5C1 9.42826 1.36875 10.3185 2.02513 10.9749C2.6815 11.6313 3.57174 12 4.5 12H9.5C10.4283 12 11.3185 12.3687 11.9749 13.0251C12.6313 13.6815 13 14.5717 13 15.5C13 16.4283 12.6313 17.3185 11.9749 17.9749C11.3185 18.6313 10.4283 19 9.5 19H1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="flex-1 ml-3 text-left whitespace-nowrap"
                sidebar-toggle-item=""
              >
                Caja
              </span>
              <svg
                sidebar-toggle-item=""
                className={
                  showCaja
                    ? 'w-6 h-6 transform rotate-180 transition duration-300'
                    : 'w-6 h-6 transition duration-300'
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {user.rol === 'administrador' && (
              <ul
                id="dropdown-example"
                className={
                  showCaja
                    ? 'inline-block py-2 space-y-2'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              onClick={
                user.rol === 'administrador' ? () => handleCordion(6) : ''
              }
              className="flex items-center py-2 px-5 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                className="flex-shrink-0 w-6 h-6  text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 7C14.9706 7 19 5.65685 19 4C19 2.34315 14.9706 1 10 1C5.02944 1 1 2.34315 1 4C1 5.65685 5.02944 7 10 7Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 11C19 12.66 15 14 10 14C5 14 1 12.66 1 11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 4V18C1 19.66 5 21 10 21C15 21 19 19.66 19 18V4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="flex-1 ml-3 text-left whitespace-nowrap "
                sidebar-toggle-item=""
              >
                Administración
              </span>
              <svg
                sidebar-toggle-item=""
                className={
                  showAdmini
                    ? 'w-6 h-6 transform rotate-180 transition duration-300'
                    : 'w-6 h-6 transition duration-300'
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {user.rol === 'administrador' && (
              <ul
                id="dropdown-example"
                className={
                  showAdmini
                    ? 'inline-block py-2 space-y-2 w-full'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <NavLink
                    to="/usuariosCreados"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Usuarios
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Crear usuarios
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/crearOficinas"
                    className="flex items-center p-2 pl-14 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Crear oficina
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default sideBar;
