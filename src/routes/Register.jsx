import { useState, useContext, useEffect } from 'react';
import { useFirestoreState } from '../hooks/useFirestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { erroresFirebase } from '../utils/erroresFirebase';
import FormError from '../components/FormError';
import { formValidate } from '../utils/formValidate';
import Swal from 'sweetalert2';
import axios from 'axios';

import FormInput from '../components/FormInput';
const Register = () => {
  //metodo que retorna la validacion de los campos
  const {
    required,
    patternEmail,
    minLengthValue,
    validateTrim,
    validateEquals,
    validateSelection,
    messageRequire,
  } = formValidate();
  const { addUserRegister, officesAll, getAllOffice } = useFirestoreState();
  //navigate
  const navegate = useNavigate();
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      rol: 'Asesor',
      saldoMax: 15000,
    },
  });

  const onSubmit = async (e) => {
    const { email, password } = e;
    const item = {
      email: e.email + '@skillien.com',
      nombres: e.nombres,
      apellidos: e.apellidoP + ' ' + e.apellidoM,
      sede: e.ciudad,
      dni: e.dni,
      rol: e.rol,
    };
    console.log(e);
    try {
      const res = await axios.post(
        'https://golden-fast.herokuapp.com/new-user',
        {
          email: item.email,
          password,
        }
      );
      console.log(res?.data.uid);
      await addUserRegister(item, res.data.uid);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario creado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      navegate('/usuariosCreados');
    } catch (error) {
      console.log(error);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };
  useEffect(() => {
    getAllOffice();
  }, []);

  return (
    <div className="overflow-auto ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col w-full justify-center items-center relative overflow-hidden px-3 sm:px-0 pb-5"
      >
        <div className="w-full flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-botton-blue">
            Registrar Usuario
          </h1>
        </div>
        <div className=" grid place-content-center grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl">
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Usuario
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              autoComplete="off"
              placeholder="Ingresar usuario"
              {...register('email', {
                required,
              })}
            ></FormInput>
            <FormError error={errors.email} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Contraseña
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              placeholder="Ingresar contraseña"
              {...register('password', {
                minLength: minLengthValue(6),
                validate: validateTrim,
              })}
            ></FormInput>
            <FormError error={errors.password} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Nombres
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese Nombres"
              {...register('nombres', {
                required: messageRequire,
                minLength: minLengthValue(3),
              })}
            ></FormInput>
            <FormError error={errors.nombres} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Apellido Parterno
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingresar apellido"
              {...register('apellidoP', {
                required: messageRequire,
                minLength: minLengthValue(3),
              })}
            ></FormInput>
            <FormError error={errors.apellidoP} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Apellido Materno
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingresar apellido"
              {...register('apellidoM', {
                required: messageRequire,
                minLength: minLengthValue(3),
              })}
            ></FormInput>
            <FormError error={errors.apellidoM} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              DNI
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="dni"
              placeholder="ingrese su DNI"
              {...register('dni', {
                required: messageRequire,
                minLength: minLengthValue(8),
              })}
            ></FormInput>
            <FormError error={errors.dni} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="sede"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Oficina
            </label>
            <select
              {...register('ciudad', {
                validate: validateSelection,
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Seleciona la oficina</option>
              {officesAll.map((office) => {
                return (
                  <option key={office.nanoid} value={office.alias}>
                    {office.alias.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <FormError error={errors.ciudad} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="sede"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Rol
            </label>
            <select
              disabled={true}
              {...register('rol')}
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Asesor">Asesor</option>
            </select>
            <FormError error={errors.rol} />
          </div>
        </div>
        <button
          className="bg-celeste p-3 rounded-lg w-11/12 xs:w-48 text-white text-xl mt-5 "
          type="submit"
        >
          Crear usuario
        </button>
      </form>
    </div>
  );
};

export default Register;
