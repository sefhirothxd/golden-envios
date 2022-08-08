import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import { useFirestoreState } from '../hooks/useFirestore';
import { Button } from 'flowbite-react';
import { UserContext } from '../context/UserProvider';
const EnvioCaja = () => {
  const [notificacion, setNotificacion] = useState(false);
  const [filterUser, setfilterUser] = useState([]);
  const [filterUserSelect, setfilterUserSelect] = useState([]);
  const { refreshUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm();
  const {
    allUser,
    getAllUsers,
    officesAll,
    getAllOffice,
    addhostoryMoney,
    updateData,
  } = useFirestoreState();
  const probando = (e) => {
    console.log(e.target.value);
    setfilterUser(allUser.filter((user) => user.sede === e.target.value));
  };
  const onSubmit = async (e) => {
    console.log(e);
    const officeNew = {
      ...e,
      uid: filterUser[0].nanoid,
      nombres: filterUser[0].nombres,
      apellidos: filterUser[0].apellidos,
    };
    console.log(officeNew);
    console.log(filterUser[0].nanoid);
    console.log(Number(e.cantidad));
    console.log(Number(filterUser[0].saldo));

    try {
      await updateData(
        filterUser[0].nanoid,
        Number(e.cantidad),
        Number(filterUser[0].saldo)
      );
      await addhostoryMoney(officeNew);
    } catch (error) {
      console.log(error);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
    refreshUser();
    reset();
    setNotificacion(true);
    setTimeout(() => {
      setNotificacion(false);
    }, 3000);
  };
  useEffect(() => {
    getAllUsers();
    getAllOffice();
  }, []);

  return (
    <div className=" flex md:pt-56 pt-10 justify-center items-center relative">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-6 ">
          <div className="w-full">
            <label
              htmlFor="oficina"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Oficina
            </label>
            <select
              {...register('oficina')}
              onChange={(e) => probando(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Seleciona la oficina</option>
              {officesAll.map((user) => {
                return (
                  <option key={user.nanoid} value={user.alias}>
                    {user.alias.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <FormError error={errors.oficina} />
          </div>
          <div className="w-full">
            <label
              htmlFor="caja"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Caja
            </label>
            <select
              {...register('caja')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Seleciona la caja</option>
              {filterUser.map((user) => {
                return (
                  <option key={user.uid} value={user.nanoid}>
                    {user.nombres.toUpperCase()} {user.apellidos.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <FormError error={errors.caja} />
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-full">
            <label
              htmlFor="cantidad"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Cantidad
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="cantidad"
              placeholder="Ingrese el cantidad"
              {...register('cantidad')}
            ></FormInput>
          </div>
          <div className="w-full">
            <label
              htmlFor="moneda"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Moneda
            </label>
            <select
              {...register('moneda')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Seleciona la moneda</option>
              <option value="Soles">Soles</option>
              <option value="Dolar">Dolares</option>
            </select>
            <FormError error={errors.moneda} />
          </div>
        </div>
        <div className="mb-6">
          <div>
            <label
              htmlFor="dniSoli"
              className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
            >
              Observacion
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="obs"
              placeholder="Observacion"
              {...register('obs')}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" className="txt-lg">
            Enviar
          </Button>
        </div>
      </form>
      <div
        className={
          `absolute -right-altoFormulario transform bottom-28 w-96  trasition-all duration-500 ease-in-out flex justify-start items-start flex-col z-10 p-4 mb-4 text-sm text-green-700 bg-green-200 rounded-lg dark:bg-green-200 dark:text-green-800 ` +
          (notificacion && ' -translate-x-altoFormulario')
        }
        role="alert"
      >
        <span className="font-medium">Exito!</span>Se añadio el saldo de manera
        satisfactoria.
      </div>
    </div>
  );
};

export default EnvioCaja;
