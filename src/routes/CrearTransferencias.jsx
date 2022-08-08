import React, { useState, useEffect, useContext } from 'react';
import { formValidate } from '../utils/formValidate';
import { useForm } from 'react-hook-form';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import { UserContext } from '../context/UserProvider';
import { useFirestoreState } from '../hooks/useFirestore';
import { erroresFirebase } from '../utils/erroresFirebase';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
const crearTransferencias = () => {
  const [notificacion, setNotificacion] = useState(false);
  const [notificacionCiudad, setNotificacionCiudad] = useState(false);
  const {
    required,
    patternEmail,
    minLength,
    minLengthValue,
    validateTrim,
    validateEquals,
    validateRequired,
    validateRequiredSelect,
    validateRequiredNumber,
    validateRequiredDni,
    validateRequiredTelefono,
  } = formValidate();
  const { user, refreshUser } = useContext(UserContext);
  const navegate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      estado: 'Pendiente',
    },
  });
  const {
    data,
    loading,
    error,
    getData,
    addData,
    getUserInfo,
    dataUser,
    getDataZona,
    updateData,
  } = useFirestoreState();

  const probando = (e) => {
    e.preventDefault();
    console.log('se detuvo el formulario');
    window.print();
  };

  const onSubmit = async ({
    apeMaternoBene,
    apeMaternoSoli,
    apePaternoBene,
    apePaternoSoli,
    cantidad,
    ciudad,
    comision,
    dniBene,
    dniSoli,
    estado,
    moneda,
    nomBeneficiario,
    nomSolicitante,
    obs,
    persona,
    telefonoBene,
    telefonoSoli,
  }) => {
    if (
      ciudad == user.sede ||
      user.saldo < parseFloat(cantidad) ||
      ciudad == '0'
    ) {
      setNotificacionCiudad(true);
      setTimeout(() => {
        setNotificacionCiudad(false);
      }, 3000);
    } else {
      const obj = {
        asesor: user.nombres + ' ' + user.apellidos,
        comision: parseFloat(comision),
        destino: ciudad,
        monto: parseFloat(cantidad),
        origen: user.sede,
        apeMaternoBene,
        apeMaternoSoli,
        apePaternoBene,
        apePaternoSoli,
        dniBene,
        dniSoli,
        estado,
        moneda,
        nomBeneficiario,
        nomSolicitante,
        obs,
        persona,
        telefonoBene,
        telefonoSoli,
        uid: user.uid,
      };

      console.log(obj);
      const nuevoSaldo = user.saldo - parseFloat(cantidad);
      console.log('resta : ', nuevoSaldo);
      setNotificacion(true);
      try {
        await addData(obj);
        console.log('aun no');
        await updateData(user.nanoid, nuevoSaldo);
        console.log('mori');
        setTimeout(() => {
          setNotificacion(false);
        }, 3000);
        console.log('get data');
        await getData();
        console.log('get user');
        await refreshUser();
        navegate('/TransferenciasCreadas');
      } catch (error) {
        console.log(error.code);
        const { code, message } = erroresFirebase(error.code);
        setError(code, { message });
        console.log(code, message);
      } finally {
      }
    }
  };

  useEffect(() => {
    // getUserInfo();
  }, []);

  return (
    <div className="mb-5 pt-5 pb-20 min-h-screen black 2xl:flex  overflow-y-auto  bg-grey-fondo rounded-2xl  relative">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full  ">
        <div className="w-full h-full m-auto grid pb-20 grid-cols-1 items-center xl:grid-cols-2 content-center  2xl:grid-cols-3 justify-center gap-10">
          <div className=" bg-white rounded-2xl  p-5 relative justify-self-center  w-96">
            <h3
              className={
                'text-xl text-center font-medium absolute -top-4  text-sideblue dark:text-white' +
                ' solicitante'
              }
            >
              Solicitante
            </h3>
            <div className="my-3 flex items-center">
              <label
                htmlFor="beneficiario"
                className="block mr-6  text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Persona
              </label>
              <label
                htmlFor="beneficiario"
                className="block  text-sm font-medium text-sideblue dark:text-gray-300"
              >
                Natural
                <input
                  className="ml-2"
                  {...register('persona')}
                  type="radio"
                  value="natural"
                  checked
                />
              </label>
              <label
                htmlFor="beneficiario"
                className="block ml-2 text-sm font-medium text-sideblue dark:text-gray-300"
              >
                Juridica
                <input
                  className="ml-2"
                  {...register('persona')}
                  type="radio"
                  value="juridica"
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="nomSolicitante"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Nombre
              </label>

              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="nomSolicitante"
                placeholder="Nombre"
                {...register('nomSolicitante', {
                  validate: validateRequired('Nombre Solicitante'),
                })}
              ></FormInput>
              <FormError error={errors.nomSolicitante} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="apePaternoSoli"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Apellido Paterno
              </label>

              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="apePaternoSoli"
                placeholder="Apellido Paterno"
                {...register('apePaternoSoli', {
                  validate: validateRequired('Apellido Paterno'),
                })}
              ></FormInput>
              <FormError error={errors.apePaternoSoli} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="apeMaternoSoli"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Apellido Materno
              </label>

              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="apeMaternoSoli"
                placeholder="Apellido Materno"
                {...register('apeMaternoSoli', {
                  validate: validateRequired('Apellido Materno'),
                })}
              ></FormInput>
              <FormError error={errors.apeMaternoSoli} />
            </div>
            <div className="mb-6">
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
                {...register('dniSoli', {
                  required,
                  validate: validateRequiredDni('Dni'),
                })}
              ></FormInput>
              <FormError error={errors.dniSoli} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="telefonoSoli"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Celular
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="telefonoSoli"
                placeholder="Telefono"
                {...register('telefonoSoli')}
              ></FormInput>
            </div>
          </div>
          <div className=" bg-white rounded-2xl  p-5 relative justify-self-center  w-96">
            <h3
              className={
                'text-xl text-center font-medium absolute -top-4  text-sideblue dark:text-white' +
                ' beneficiario'
              }
            >
              Beneficiario
            </h3>
            <div className="my-3 h-7"></div>
            <div className="mb-6">
              <label
                htmlFor="nomBeneficiario"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Nombre
              </label>

              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="nomBeneficiario"
                placeholder="Nombre"
                {...register('nomBeneficiario', {
                  validate: validateRequired('Nombre Beneficiario'),
                })}
              ></FormInput>
              <FormError error={errors.nomBeneficiario} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="apePaternoBene"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Apellido Paterno
              </label>

              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="apePaternoBene"
                placeholder="Apellido Paterno"
                {...register('apePaternoBene', {
                  validate: validateRequired('Apellido Paterno'),
                })}
              ></FormInput>
              <FormError error={errors.apePaternoBene} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="apeMaternoBene"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Apellido Materno
              </label>

              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="apeMaternoBene"
                placeholder="Apellido Materno"
                {...register('apeMaternoBene', {
                  validate: validateRequired('Apellido Materno'),
                })}
              ></FormInput>
              <FormError error={errors.apeMaternoBene} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="dniBene"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                DNI
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="dniBene"
                placeholder="DNI"
                {...register('dniBene', {
                  required,
                  validate: validateRequiredDni('Dni'),
                })}
              ></FormInput>
              <FormError error={errors.dniBene} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="telefonoBene"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Celular
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="telefonoBene"
                placeholder="Telefono"
                {...register('telefonoBene')}
              ></FormInput>
            </div>
          </div>
          <div className=" bg-white rounded-2xl  p-5 relative justify-self-center  w-96">
            <h3
              className={
                'text-xl text-center font-medium absolute -top-4  text-sideblue dark:text-white' +
                ' monto'
              }
            >
              Monto
            </h3>
            <div className="my-3 h-7"></div>
            <div className="mb-6">
              <label
                htmlFor="asesor"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Oficina de destino
              </label>
              <select
                {...register('ciudad', {
                  validate: validateRequiredSelect(),
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="0">Seleciona la ciudad</option>
                <option value="lima">Lima</option>
                <option value="cuzco">Cuzco</option>
                <option value="piura">Piura</option>
              </select>
              <FormError error={errors.ciudad} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Moneda"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Tipo de moneda
              </label>
              <select
                {...register('moneda', {
                  validate: validateRequiredSelect(),
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {/* <option value="0">Seleciona la moneda</option> */}
                <option value="Sol">Soles</option>
                <option value="Dolar">Dolares</option>
              </select>
              <FormError error={errors.moneda} />
            </div>
            <div className="mb-6">
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
                {...register('cantidad', {
                  required,
                  validate: validateRequiredNumber('cantidad'),
                })}
              ></FormInput>
              <FormError error={errors.cantidad} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="comision"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Comision
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="comision"
                placeholder="Ingrese una comision"
                {...register('comision', {
                  required,
                  validate: validateRequiredNumber('Comision'),
                })}
              ></FormInput>
              <FormError error={errors.comision} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="obs"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Ingrese una observación
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="obs"
                placeholder="Ingrese una observacion"
                {...register('obs')}
              ></FormInput>
            </div>
          </div>
        </div>
        <div className="w-full my-5 flex justify-center items-center gap-10 fixed -bottom-5 right  bg-white h-14 ">
          <Button onClick={() => reset()}>Limpiar</Button>
          <Button type="submit">Trasferencia</Button>
        </div>
      </form>
      <div
        className={
          `absolute -right-96 transform bottom-28  trasition-all duration-500 ease-in-out flex justify-start items-start flex-col z-10 p-4 mb-4 text-sm text-green-700 bg-green-200 rounded-lg dark:bg-green-200 dark:text-green-800 ` +
          (notificacion && ' -translate-x-96')
        }
        role="alert"
      >
        <span className="font-medium">Exito!</span>El giro se realido de manera
        satisfactoria.
      </div>
      <div
        className={
          `absolute -right-altoFormulario transform bottom-28 w-96  trasition-all duration-500 ease-in-out flex justify-start items-start flex-col z-10 p-4 mb-4 text-sm text-red-700 bg-red-200 rounded-lg dark:bg-green-200 dark:text-green-800 ` +
          (notificacionCiudad && ' -translate-x-altoFormulario')
        }
        role="alert"
      >
        <span className="font-medium">Error!</span>No puede superar el saldo
        actual y no olvide de seleccionar una zona distinta a la suya.
      </div>
    </div>
  );
};

export default crearTransferencias;
