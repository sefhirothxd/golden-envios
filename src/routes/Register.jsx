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
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();
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
      console.log(error.code);
      setError('firebase', {
        message: erroresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Register</h1>
      <FormError error={errors.firebase} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/2 justify-center items-center h-100"
      >
        <FormInput
          type="email"
          placeholder="Ingresar email"
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>
        <FormError error={errors.email} />
        <FormInput
          type="password"
          placeholder="Ingresar contraseña"
          {...register('password', {
            minLength,
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password} />
        <FormInput
          type="password"
          placeholder="Ingresar contraseña"
          {...register('repassword', {
            validate: validateEquals(getValues),
          })}
        ></FormInput>

        <FormError error={errors.repassword} />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
