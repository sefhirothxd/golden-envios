import { useState, useContext } from 'react';
import { useFirestoreState } from '../hooks/useFirestore';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { erroresFirebase } from '../utils/erroresFirebase';
import FormError from '../components/FormError';
import { formValidate } from '../utils/formValidate';
import FormInput from '../components/FormInput';
const CrearOficinas = () => {
  const { user } = useContext(UserContext);
  const [notificacion, setNotificacion] = useState(false);
  //metodo que retorna la validacion de los campos
  const {
    required,
    patternEmail,
    minLengthValue,
    validateTrim,
    validateEquals,
    validateSelection,
    validateRequiredSelect,
    messageRequire,
  } = formValidate();
  const { addOffice } = useFirestoreState();
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
    console.log(e);
    const item = {
      alias: e.alias,
      direccion: e.direccion,
      ciudad: e.ciudad,
      departamento: e.departamento,
      uid: user.uid,
    };
    // try {
    //   const reg = await addOffice(item);
    // } catch (error) {
    //   console.log(error);
    //   const { code, message } = erroresFirebase(error.code);
    //   setError(code, { message });
    // }
    setNotificacion(true);
    setTimeout(() => {
      setNotificacion(false);
    }, 3000);
  };

  return (
    <div className="overflow-auto ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full justify-center items-center relative overflow-hidden"
      >
        <div className="w-full flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-botton-blue">
            Registrar Oficina
          </h1>
        </div>
        <div className=" grid place-content-center sm:grid-cols-2  max-w-4xl gap-y-5 gap-x-11 grid-cols-1 w-full mb-12">
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Dirección
            </label>
            <FormInput
              className="bg-gray-50 border w-full max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              autoComplete="off"
              placeholder="Ingresar dirección"
              {...register('direccion', {
                required,
              })}
            ></FormInput>
            <FormError error={errors.direccion} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Ciudad
            </label>
            <select
              {...register('ciudad', {
                validate: validateRequiredSelect(),
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Seleciona la Ciudad</option>
              <option value="lima">Lima</option>
              <option value="cuzco">Cuzco</option>
              <option value="piura">Piura</option>
            </select>
            <FormError error={errors.Ciudad} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Departamento
            </label>
            <select
              {...register('departamento', {
                validate: validateRequiredSelect(),
              })}
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Seleciona el departamento</option>
              <option value="lima">Amazonas</option>
              <option value="cuzco">Áncash</option>
              <option value="piura">Apurímac</option>
              <option value="piura">Arequipa</option>
              <option value="piura">Ayacucho</option>
              <option value="piura">Cajamarca</option>
              <option value="piura">Callao</option>
              <option value="piura">Cusco</option>
              <option value="piura">Huancavelica</option>
              <option value="piura">Huánuco</option>
              <option value="piura">Ica</option>
              <option value="piura">Junín</option>
              <option value="piura">La Libertad</option>
              <option value="piura">Lambayeque</option>
              <option value="piura">Lima (departamento)</option>
              <option value="piura">Loreto</option>
              <option value="piura">Madre de Dios</option>
              <option value="piura">Moquegua</option>
              <option value="piura">Pasco</option>
              <option value="piura">Piura</option>
              <option value="piura">Puno</option>
              <option value="piura">San Martín</option>
              <option value="piura">Tacna</option>
              <option value="piura">Tumbes</option>
              <option value="piura">Ucayali</option>
            </select>
            <FormError error={errors.departamento} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nomSolicitante"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Alias
            </label>
            <FormInput
              className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Ingresar alias"
              {...register('alias', {
                required: messageRequire,
                minLength: minLengthValue(3),
              })}
            ></FormInput>
            <FormError error={errors.alias} />
          </div>
        </div>
        <button
          className="bg-celeste p-3 rounded-lg w-11/12 xs:w-48 text-white text-xl mb-3 "
          type="submit"
        >
          Crear usuario
        </button>
        <div
          className={
            `absolute -right-96 transform bottom-28  trasition-all duration-500 ease-in-out flex justify-start items-start flex-col z-10 p-4 mb-4 text-sm text-green-700 bg-green-200 rounded-lg dark:bg-green-200 dark:text-green-800 ` +
            (notificacion && ' -translate-x-96')
          }
          role="alert"
        >
          <span className="font-medium">Exito!</span>La cuenta ha sido
          creada..!!
        </div>
      </form>
    </div>
  );
};

export default CrearOficinas;
