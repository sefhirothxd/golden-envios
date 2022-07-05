import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import { useFirestoreState } from '../hooks/useFirestore';
import Campana from '../assets/img/campana.svg';
import { useForm } from 'react-hook-form';
import {
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
  Checkbox,
} from 'flowbite-react';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import { formValidate } from '../utils/formValidate';
import SideBar from '../components/SideBar';

const Home = () => {
  const [modal, setModal] = useState(false);
  const [notificacion, setNotificacion] = useState(false);
  const [bar, setBar] = useState(false);
  const { logoutUser } = useContext(UserContext);
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
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      estado: true,
    },
  });
  const logOut = async () => {
    await logoutUser();
  };

  const onSubmit = async ({
    beneficiario,
    comision,
    estado,
    monto,
    ciudad,
    obs,
    solicitante,
  }) => {
    const obj = {
      asesor: dataUser.nombres + ' ' + dataUser.apellidos,
      beneficiario,
      comision: parseFloat(comision),
      estado,
      destino: ciudad,
      monto: parseFloat(monto),
      obs,
      origen: dataUser.sede,
      solicitante,
    };
    console.log(obj);
    try {
      await addData(obj);
      setNotificacion(true);
      setModal(false);
      setTimeout(() => {
        setNotificacion(false);
      }, 3000);
      getData();
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
    }
  };

  useEffect(() => {
    console.log(data);
    getData();
    getUserInfo();
  }, []);
  const loadingData = loading.getData && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>;

  return (
    <div className="flex h-screen w-full relative">
      <SideBar
        bar={bar}
        setBar={setBar}
        modal={modal}
        setModal={setModal}
        getDataZona={getDataZona}
        getData={getData}
      />
      <div className="flex flex-col h-screen w-full p-8 overflow-hidden">
        <div className="bg-white  border-b flex justify-end items-center relative border-gray-300 rounded-xl mb-5 w-full h-14 px-2">
          {notificacion && (
            <div
              class="absolute flex justify-start items-start flex-col z-10 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span class="font-medium">Success alert!</span>La tranferencia se
              creo con exito
            </div>
          )}
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
              <p className="text-transform: capitalize">
                {dataUser?.sede || 'cargando...'}
              </p>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <h3>Saldo:</h3>
              <p className="px-2 py-1 bg-red-500 rounded-full">S/15,000.00</p>
              <p className="px-2 py-1 bg-gray-200 rounded-full">$ 0</p>
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
              <span className="block text-sm">{}</span>
              <span className="block truncate text-sm font-medium">{}</span>
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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
                >
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Registrar Transferencia
                  </h3>
                  <div className="mb-6">
                    <label
                      htmlFor="beneficiario"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Beneficiario
                    </label>

                    <FormInput
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="beneficiario"
                      placeholder="Ingrese el nombre del beneficiario"
                      {...register('beneficiario')}
                    ></FormInput>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="solicitante"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Solicitante
                    </label>

                    <FormInput
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="solicitante"
                      placeholder="Ingrese el nombre del solicitante"
                      {...register('solicitante')}
                    ></FormInput>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="asesor"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Destino
                    </label>
                    <select
                      {...register('ciudad')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="0">Seleciona la ciudad</option>
                      <option value="lima">Lima</option>
                      <option value="cuzco">Cuzco</option>
                      <option value="piura">Piura</option>
                    </select>
                    <FormError error={errors.ciudad} />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="monto"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Monto
                    </label>
                    <FormInput
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="monto"
                      placeholder="Ingrese el monto"
                      {...register('monto')}
                    ></FormInput>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="comision"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Comision
                    </label>
                    <FormInput
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="comision"
                      placeholder="Ingrese una comision"
                      {...register('comision')}
                    ></FormInput>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="obs"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Ingrese una observacion
                    </label>
                    <FormInput
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="obs"
                      placeholder="Ingrese una observacion"
                      {...register('obs')}
                    ></FormInput>
                  </div>

                  <div className="w-full">
                    <Button onClose={() => setModal(!modal)} type="submit">
                      Crear Trasferencia
                    </Button>
                  </div>
                </form>
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
              {data?.map(
                (
                  {
                    beneficiario,
                    estado,
                    solicitante,
                    origen,
                    asesor,
                    fechaCreada,
                    destino,
                    monto,
                    comision,
                    obs,
                  },
                  index
                ) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {
                        // firebase Timestamp full .toLocaleTimeString() hora
                        fechaCreada.toDate().toLocaleDateString()
                      }
                    </th>
                    <td className="px-6 py-4">{beneficiario}</td>
                    <td className="px-6 py-4">{solicitante}</td>
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
                    <td className="px-6 py-4 flex items-center justify-center gap-2">
                      {estado ? 'Pendiente' : 'Cancelado'}
                      {estado ? (
                        <span className="bg-green-500 h-1 w-1 inline-block rounded-full"></span>
                      ) : (
                        <span className="bg-red-500 h-1 w-1 inline-block rounded-full"></span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
