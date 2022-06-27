import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import Logo from '../assets/img/logoLogin2.png';
import Campana from '../assets/img/campana.svg';
import {
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
  Checkbox,
} from 'flowbite-react';
import X from '../assets/img/x.svg';
const Home = () => {
  const [showTrans, setShowTrans] = useState(false);
  const [showHabi, setShowHabi] = useState(false);
  const [showRece, setShowRece] = useState(false);
  const [showCuentas, setShowCuentas] = useState(false);
  const [showCaja, setShowCaja] = useState(false);
  const [bar, setBar] = useState(false);
  const [modal, setModal] = useState(false);
  const { logoutUser } = useContext(UserContext);
  const logOut = async () => {
    await logoutUser();
  };

  return (
    <div className="flex h-screen w-full relative">
      <aside className={!bar ? 'barSide' : 'barSide2'} aria-label="Sidebar">
        <div className="overflow-y-auto h-full flex relative  items-center flex-col w-72  py-4 px-3 bg-sideblue rounded-tr-3xl dark:bg-gray-800">
          <button onClick={() => setBar(!bar)}>
            <img
              src={X}
              className="h-6 w-auto absolute right-5 920:hidden"
              alt="aspa"
            />
          </button>
          <img src={Logo} className="mt-10" alt="logo golden fast" />
          <hr className="bg-white  w-full mt-7 mb-7" />
          <ul className="space-y-2 w-full">
            <li>
              <button
                type="button"
                onClick={() => setShowTrans(!showTrans)}
                className="flex items-center p-2 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
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
                  Transfarencias
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
                    ? 'inline-block py-2 space-y-2 '
                    : 'hidden py-2 space-y-2 '
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowHabi(!showHabi)}
                className="flex items-center p-2 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
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
                  className="w-6 h-6"
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
                  showHabi
                    ? 'inline-block py-2 space-y-2'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowRece(!showRece)}
                className="flex items-center p-2 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
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
                  className="w-6 h-6"
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
                  showRece
                    ? 'inline-block py-2 space-y-2'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowCuentas(!showCuentas)}
                className="flex items-center p-2 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
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
                  className="w-6 h-6"
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
                  showCuentas
                    ? 'inline-block py-2 space-y-2'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowCaja(!showCaja)}
                className="flex items-center p-2 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
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
                  className="w-6 h-6"
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
                  showCaja
                    ? 'inline-block py-2 space-y-2'
                    : 'hidden py-2 space-y-2'
                }
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-xl font-normal text-white rounded-lg transition duration-75 group   dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex flex-col h-screen w-full p-8 overflow-hidden">
        <div className="bg-white border-b flex justify-end items-center relative border-gray-300 rounded-xl mb-5 w-full h-14 px-2">
          <div className="flex justify-between w-full items-center gap-4">
            <div className="flex justify-center items-center gap-2">
              <div className="920:hidden ">
                <button
                  className="flex justify-center items-center"
                  color={'white'}
                  onClick={() => setBar(!bar)}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    className=" h-6 w-6 cursor-pointer text-black dark:text-gray-400"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <p>Sede:</p>
              <select
                className="rounded-full py-1 px-2 w-32 "
                name="sede"
                id=""
              >
                <option value="1">Lima</option>
                <option value="2">Pichanaqui</option>
                <option value="3">Cusco</option>
              </select>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <h3>Saldo:</h3>
              <p className="px-2 py-1 bg-red-500 rounded-full">S/15,000.00</p>
              <p className="px-2 py-1 bg-gray-200 rounded-full">$/15,000.00</p>
            </div>
          </div>
          <img className="h-6 mx-4" src={Campana} alt="campana" />
          <Dropdown
            size={'sm'}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
            }
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Header>
              <span className="block text-sm">Ricardo milo</span>
              <span className="block truncate text-sm font-medium">
                admin@test.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOut}>Cerrar sesion</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="mb-5">
          <>
            <Button onClick={() => setModal(!modal)}>Crear Trasferencia</Button>
            <Modal
              show={modal}
              size="md"
              popup={true}
              onClose={() => setModal(!modal)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                      id="email"
                      className="dark:border-gray-500 dark:bg-gray-600"
                      placeholder="name@company.com"
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                      id="password"
                      className="dark:border-gray-500 dark:bg-gray-600"
                      type="password"
                      required={true}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <a
                      href="/modal"
                      className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Lost Password?
                    </a>
                  </div>
                  <div className="w-full">
                    <Button>Log in to your account</Button>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <a
                      href="/modal"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Create account
                    </a>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        </div>
        <div className=" overflow-x-auto w-full shadow-md sm:rounded-xl">
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  20/20/2022
                </th>
                <td className="px-6 py-4">Nombre y apellido</td>
                <td className="px-6 py-4">Golden fast</td>
                <td className="px-6 py-4">Lima</td>
                <td className="px-6 py-4">Ludwing</td>
                <td className="px-6 py-4">s/2,022</td>
                <td className="px-6 py-4">s/20</td>
                <td className="px-6 py-4">x liquidar</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  Pagado
                  <span className="bg-green-500 h-1 w-1 inline-block rounded-full"></span>
                </td>
              </tr>
              <tr className="bg-red-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  20/20/2022
                </th>
                <td className="px-6 py-4">Nombre y apellido</td>
                <td className="px-6 py-4">Golden fast</td>
                <td className="px-6 py-4">Lima</td>
                <td className="px-6 py-4">Ludwing</td>
                <td className="px-6 py-4">s/2,022</td>
                <td className="px-6 py-4">s/20</td>
                <td className="px-6 py-4">x liquidar</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  Pendiente
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  20/20/2022
                </th>
                <td className="px-6 py-4">Nombre y apellido</td>
                <td className="px-6 py-4">Golden fast</td>
                <td className="px-6 py-4">Lima</td>
                <td className="px-6 py-4">Ludwing</td>
                <td className="px-6 py-4">s/2,022</td>
                <td className="px-6 py-4">s/20</td>
                <td className="px-6 py-4">x liquidar</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  pagado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
