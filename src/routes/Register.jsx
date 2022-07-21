import { useState, useContext } from 'react';
import { useFirestoreState } from '../hooks/useFirestore';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { erroresFirebase } from '../utils/erroresFirebase';
import FormError from '../components/FormError';
import { formValidate } from '../utils/formValidate';

import FormInput from '../components/FormInput';
const Register = () => {
  const { registerUser } = useContext(UserContext);
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
  const { addUserRegister } = useFirestoreState();
  //navigate
  const navegate = useNavigate();
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async (e) => {
    const { email, password } = e;
    const item = {
      email: e.email + '@skillien.com',
      nombres: e.nombres,
      apellidos: e.apellidos,
      sede: e.ciudad,
      direccion: e.direccion,
      dni: e.dni,
      saldo: Number(e.saldo),
    };
    console.log(e);
    try {
      const res = await registerUser(item.email, password);
      const reg = await addUserRegister(item, res.user.uid);
      console.log('respuesta del registro', reg);
    } catch (error) {
      console.log(error);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <div className="h-screen flex justify-evenly items-center  overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full justify-center items-center h-100"
      >
        <div className="w-full flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-botton-blue">Registrar</h1>
        </div>
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          type="text"
          autoComplete="off"
          placeholder="Ingresar usuario"
          {...register('email', {
            required,
          })}
        ></FormInput>
        <FormError error={errors.email} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          type="password"
          placeholder="Ingresar contraseña"
          {...register('password', {
            minLength: minLengthValue(6),
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5 border-gray-500 border outline-blue-600"
          placeholder="Nombres"
          {...register('nombres', {
            required: messageRequire,
            minLength: minLengthValue(3),
          })}
        ></FormInput>
        <FormError error={errors.nombres} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5 border-gray-500 border outline-blue-600"
          placeholder="Apellidos"
          {...register('apellidos', {
            required: messageRequire,
            minLength: minLengthValue(3),
          })}
        ></FormInput>
        <FormError error={errors.apellidos} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5 border-gray-500 border outline-blue-600"
          type="dni"
          placeholder="ingrese su DNI"
          {...register('dni', {
            required: messageRequire,
            minLength: minLengthValue(8),
          })}
        ></FormInput>
        <FormError error={errors.dni} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5 border-gray-500 border outline-blue-600"
          type="dni"
          placeholder="Ingrese el saldo"
          {...register('saldo', {
            required: messageRequire,
            minLength: minLengthValue(3),
          })}
        ></FormInput>
        <FormError error={errors.saldo} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5 border-gray-500 border outline-blue-600"
          placeholder="ingrese su dirección"
          {...register('direccion', {
            required: messageRequire,
          })}
        ></FormInput>
        <FormError error={errors.direccion} />
        <div className="mb-6">
          <label
            htmlFor="sede"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Selecciona la sede del usuario
          </label>
          <select
            {...register('ciudad', {
              validate: validateSelection,
            })}
            className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          >
            <option value="0">Seleciona la ciudad</option>
            <option value="lima">Lima</option>
            <option value="cuzco">Cuzco</option>
            <option value="piura">Piura</option>
          </select>
          <FormError error={errors.ciudad} />
        </div>
        <button
          className="bg-botton-blue p-3 rounded-2xl w-11/12 xs:w-96 text-white text-xl mb-3 "
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Register;
