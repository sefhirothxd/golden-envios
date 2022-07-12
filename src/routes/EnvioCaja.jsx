import React from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import { Button } from 'flowbite-react';
const EnvioCaja = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();
  return (
    <div className=" flex md:pt-56 pt-10 justify-center items-center">
      <form className="w-full max-w-4xl">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Seleciona la oficina</option>
              <option value="lima">Lima</option>
              <option value="cuzco">Cuzco</option>
              <option value="piura">Piura</option>
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
              <option value="Pedro Navaja">Pedro Navaja</option>
              <option value="Anthony Ureta">Anthony Ureta</option>
              <option value="Ludwin vite">Ludwin vite</option>
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
              <option value="Sol">Soles</option>
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
              DNI
            </label>
            <FormInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="dniSoli"
              placeholder="DNI"
              {...register('dniSoli')}
            ></FormInput>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" className="txt-lg">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnvioCaja;
