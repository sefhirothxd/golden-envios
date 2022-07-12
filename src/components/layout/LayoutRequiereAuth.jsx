import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';
import { useFirestoreState } from '../../hooks/useFirestore';
import Campana from '../../assets/img/campana.svg';
import { formValidate } from '../../utils/formValidate';
import { useForm } from 'react-hook-form';
import SideBar from '../../components/SideBar';
import {
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
  Checkbox,
} from 'flowbite-react';
const LayoutRequiereAuth = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  const [modal, setModal] = useState(false);

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

  useEffect(() => {
    console.log(data);
    getData();
    getUserInfo();
  }, []);

  return (
    <div className="flex h-screen w-full relative">
      <SideBar bar={bar} setBar={setBar} />
      <div className="flex flex-col h-screen w-full p-8 overflow-hidden">
        <div className="bg-white  border-b flex justify-end items-center relative border-gray-300 rounded-xl mb-5 w-full h-14 px-2">
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
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutRequiereAuth;
