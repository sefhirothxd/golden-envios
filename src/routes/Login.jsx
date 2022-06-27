import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logoLogin.svg';
import Mundo from '../assets/img/mundo2.png';
import { erroresFirebase } from '../utils/erroresFirebase';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import { formValidate } from '../utils/formValidate';
const login = () => {
  //context
  const { loginUser, setUser } = useContext(UserContext);
  //navigate
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();
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
      await loginUser(email, password);
      navegate('/');
    } catch (error) {
      console.log(error.code);
      setError('firebase', {
        message: erroresFirebase(error.code),
      });
    }
  };
  return (
    <div className="h-screen flex justify-evenly items-center  overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full xl:w-1/3 justify-center items-center"
      >
        <div className="w-full flex justify-center mb-8">
          <img src={Logo} alt="logo golden fast" className="w-44" />
        </div>
        <FormError error={errors.firebase} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          type="email"
          name="email"
          placeholder="Usuario"
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>
        <FormError error={errors.email} />
        <FormInput
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          type="password"
          name="password"
          placeholder="Contraseña"
          {...register('password', {
            minLength,
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password} />
        <button
          type="submit"
          className="bg-botton-blue p-3 rounded-2xl w-11/12 xs:w-96 text-white text-xl mb-3 "
        >
          Acceder
        </button>
        <a
          className=" text-grey-ancla text-xl font-normal text-center"
          href="#"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </form>
      <div className="w-2/3 fondo hidden xl:block overflow-hidden h-screen">
        <img src={Mundo} className="h-screen w-full" alt="" />
      </div>
      <p className=" absolute bottom-8 left-10 underline text-xl ">Soporte</p>
    </div>
  );
};

export default login;
