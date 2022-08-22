import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import { useFirestoreState } from '../hooks/useFirestore';
import { useForm } from 'react-hook-form';
import { formValidate } from '../utils/formValidate';
import Intercambio from '../assets/img/intercambio.svg';
import axios from 'axios';

const Home = () => {
  const { logoutUser, user } = useContext(UserContext);
  const [cambio, setCambio] = useState({});
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

  const dolarSunat = async () => {
    const res = await axios.get('https://golden-fast.herokuapp.com/cambio');
    setCambio(res.data);
  };

  useEffect(() => {
    dolarSunat(data);
    getData();
  }, []);

  return (
    <div className="min-h-screen  overflow-auto">
      <div className="mb-5 pb-20 flex  justify-center  des items-center flex-col  overflow-auto pt-0 2xl:pt-60 ">
        <div className="text-sideblue text-center mb-10 ">
          <h1 className="text-5xl font-medium mb-6">
            Hola, {user?.nombres?.toUpperCase() || 'Loading...'}
          </h1>
          <p className="text-3xl font-normal">
            Saldo consumido{' '}
            {user?.saldo.toLocaleString('en-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || 'cargando...'}{' '}
            de{' '}
            {user?.saldoMax?.toLocaleString('en-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || 'cargando...'}
          </p>
        </div>
        <div className="flex justify-center items-center flex-wrap  gap-4">
          <div className="w-full md:w-96">
            <h2 className="font-bold mb-4 text-sideblue text-center text-3xl">
              Tipo de cambio actual
            </h2>
            <div className="bg-sideblue flex justify-center items-center gap-6 p-5 text-center text-white  rounded-2xl">
              <div>
                <p className="font-medium text-2xl">Comprar</p>
                <h3 className="font-bold text-3xl">
                  USD {cambio.compra?.toFixed(2)}
                </h3>
              </div>
              <img src={Intercambio} alt="" />
              <div>
                <p className="font-medium text-2xl">Venta</p>
                <h3 className="font-bold text-3xl">
                  USD {cambio.venta?.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
