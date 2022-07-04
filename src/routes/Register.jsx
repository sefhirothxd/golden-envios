import { useState, useContext } from 'react';
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

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navegate('/');
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
          type="email"
          placeholder="Ingresar email"
          {...register('email', {
            required,
            pattern: patternEmail,
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
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          type="password"
          placeholder="Repite contraseña"
          {...register('repassword', {
            validate: validateEquals(getValues('password')),
          })}
        ></FormInput>
        <FormError error={errors.repassword} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5 border-gray-500 border outline-blue-600"
          type="name"
          placeholder="Nombres"
          {...register('name', {
            required: messageRequire,
            minLength: minLengthValue(6),
          })}
        ></FormInput>
        <FormError error={errors.name} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5 border-gray-500 border outline-blue-600"
          type="apellidos"
          placeholder="Apellidos"
          {...register('apellidos', {
            required: messageRequire,
            minLength: minLengthValue(6),
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
        <FormError error={errors.apellidos} />
        <select
          {...register('region', {
            validate: validateSelection,
          })}
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
        >
          <option value="0">Seleciona la region</option>
          <option value="lima">Lima</option>
          <option value="cuzco">Cuzco</option>
          <option value="piura">Piura</option>
        </select>
        <FormError error={errors.region} />
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
