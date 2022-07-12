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
  const logOut = async () => {
    await logoutUser();
  };

  useEffect(() => {
    console.log(data);
    getData();
    getUserInfo();
  }, []);

  return <>Soy Home</>;
};

export default Home;
