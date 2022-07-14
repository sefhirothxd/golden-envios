import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import { useFirestoreState } from '../hooks/useFirestore';
import { useForm } from 'react-hook-form';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import { formValidate } from '../utils/formValidate';
import Table from '../components/Table';

const Home = () => {
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

  useEffect(() => {
    console.log(data);
    getData();
    // getUserInfo();
  }, []);

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <div className="text-sideblue text-center mb-28">
        <h1 className="text-5xl font-medium mb-6">
          Hola, {dataUser.nombres?.toUpperCase() || 'Loading...'}
        </h1>
        <p className="text-3xl font-normal">
          Tienes un saldo disponible de S/5,000 de S/15,000
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4">
        <div className="w-96">
          <h2 className="font-bold mb-4 text-sideblue text-center text-3xl">
            Tipo de cambio actual
          </h2>
          <div className="bg-sideblue p-5 text-center text-white  rounded-2xl">
            <div className="mb-4">
              <p className="font-medium text-2xl">Comprar</p>
              <h3 className="font-bold text-3xl">USD 3.97</h3>
            </div>
            <div>
              <p className="font-medium text-2xl">Venta</p>
              <h3 className="font-bold text-3xl">USD 3.90</h3>
            </div>
          </div>
        </div>
        <div className="w-96">
          <h2 className="font-bold mb-4 text-sideblue text-center text-3xl">
            Tipo de cambio actual
          </h2>
          <div className="bg-sideblue p-5 text-center text-white  rounded-2xl">
            <div className="mb-4">
              <p className="font-medium text-2xl">Comprar</p>
              <h3 className="font-bold text-3xl">USD 3.97</h3>
            </div>
            <div>
              <p className="font-medium text-2xl">Venta</p>
              <h3 className="font-bold text-3xl">USD 3.90</h3>
            </div>
          </div>
        </div>
        <div className="w-96">
          <h2 className="font-bold mb-4 text-sideblue text-center text-3xl">
            Tipo de cambio actual
          </h2>
          <div className="bg-sideblue p-5 text-center text-white  rounded-2xl">
            <div className="mb-4">
              <p className="font-medium text-2xl">Comprar</p>
              <h3 className="font-bold text-3xl">USD 3.97</h3>
            </div>
            <div>
              <p className="font-medium text-2xl">Venta</p>
              <h3 className="font-bold text-3xl">USD 3.90</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
