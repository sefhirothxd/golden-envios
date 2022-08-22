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
import axios from 'axios';
import Swal from 'sweetalert2';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNTkxLCJjb3JyZW8iOiJidmVyYWNhY2hheUBnbWFpbC5jb20iLCJpYXQiOjE2NjAwNjE3NjJ9.EEiD81bUFdlC5E-cqVjNGTo_qXNQ9fGxMfA_9PRuGVo';

const crearTransferencias = () => {
  const [notificacion, setNotificacion] = useState(false);
  const [fullNameSoli, setFullNameSoli] = useState({
    nomSolicitante: '',
    soliApellidos: '',
  });
  const [fullNameBene, setFullNameBene] = useState({
    nomBeneficiario: '',
    beneApellidos: '',
  });

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
    setValue,
  } = useForm({
    defaultValues: {
      estado: 'Pendiente',
      moneda: 'Soles',
      comision: '0',
    },
  });
  const {
    data,
    loading,
    error,
    officesAll,
    getAllOffice,
    getData,
    addData,
    getUserInfo,
    dataUser,
    getDataZona,
    updateData,
    updateDataRestarSaldo,
  } = useFirestoreState();

  const probando = (e) => {
    setFullNameSoli({
      ...fullNameSoli,
      [e.target.name]: e.target.value,
    });
    console.log(fullNameSoli);
  };
  const onChangeBene = (e) => {
    setFullNameBene({
      ...fullNameBene,
      [e.target.name]: e.target.value,
    });
    console.log(fullNameBene);
  };

  const soliDni = async (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 8) {
      const datos = await axios.post(
        'https://www.softwarelion.xyz/api/reniec/reniec-dni',
        {
          dni: e.target.value,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log(datos.data.result);
      setValue('nomSolicitante', datos.data.result.nombres);
      setValue(
        'soliApellidos',
        datos.data.result.paterno + ' ' + datos.data.result.materno
      );
    }
  };
  const beneDni = async (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 8) {
      const datos = await axios.post(
        'https://www.softwarelion.xyz/api/reniec/reniec-dni',
        {
          dni: e.target.value,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log(datos.data.result);
      setValue('nomBeneficiario', datos.data.result.nombres);
      setValue(
        'beneApellidos',
        datos.data.result.paterno + ' ' + datos.data.result.materno
      );
    }
  };

  const onSubmit = async ({
    cantidad,
    ciudad,
    comision,
    dniBene,
    dniSoli,
    estado,
    moneda,
    obs,
    telefonoBene,
    telefonoSoli,
    nomSolicitante,
    soliApellidos,
    nomBeneficiario,
    beneApellidos,
  }) => {
    if (
      ciudad == user.sede ||
      user.saldoMax < user.saldo + (parseFloat(cantidad) + parseFloat(comision))
    ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title:
          ciudad == user.sede
            ? 'Error no puede elegir la misma ciudad del usuario'
            : 'El saldo es insuficiente',
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (parseFloat(cantidad) <= 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El Monto no puede ser menos o igual a 0',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const obj = {
        asesor: user.nombres + ' ' + user.apellidos,
        comision: parseFloat(comision),
        destino: ciudad,
        monto: parseFloat(cantidad),
        origen: user.sede,
        soliApellidos,
        beneApellidos,
        dniBene,
        dniSoli,
        estado,
        moneda,
        nomBeneficiario,
        nomSolicitante,
        obs,
        telefonoBene,
        telefonoSoli,
        uid: user.uid,
      };

      console.log(obj);
      const nuevoSaldo =
        user.saldo + parseFloat(cantidad) + parseFloat(comision);
      console.log('saldo actul : ', user.saldo);
      console.log('suma saldo nuevo : ', nuevoSaldo);
      try {
        await addData(obj);
        await updateDataRestarSaldo(user.nanoid, nuevoSaldo);
        console.log('get data');
        await getData();
        console.log('get user');
        await refreshUser();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Trasferencia creada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        navegate('/TransferenciasCreadas');
      } catch (error) {
        console.log(error.code);
        const { code, message } = erroresFirebase(error.code);
        setError(code, { message });
        console.log(code, message);
      }
    }
  };

  useEffect(() => {
    getAllOffice();
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
                onChange={(e) => beneDni(e)}
                {...register('dniSoli', {
                  // required,
                  // validate: validateRequiredDni('dniSoli'),
                  onChange: (e) => {
                    soliDni(e);
                  },
                })}
              ></FormInput>
              <FormError error={errors.dniSoli} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="nomSolicitante"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Nombres
              </label>

              <FormInput
                // value={fullNameSoli.nomSolicitante}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Nombres"
                {...register('nomSolicitante', {
                  // required,
                  // validate: validateRequired('nomSolicitante'),
                })}
              ></FormInput>
              <FormError error={errors.nomSolicitante} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Apellidos"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Apellidos
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Apellidos"
                {...register('soliApellidos', {
                  // required,
                  // validate: validateRequired('soliApellidos'),
                })}
              ></FormInput>
              <FormError error={errors.soliApellidos} />
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
                placeholder="DNI"
                {...register('dniBene', {
                  onChange: (e) => {
                    beneDni(e);
                  },
                })}
              ></FormInput>
              <FormError error={errors.dniBene} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="nomBeneficiario"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Nombres
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="nomBeneficiario"
                placeholder="Nombres"
                {...register('nomBeneficiario', {
                  // validate: validateRequired('Nombre Beneficiario'),
                })}
              ></FormInput>
              <FormError error={errors.nomBeneficiario} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="apePaternoBene"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Apellidos
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="beneApellidos"
                placeholder="Apellidos"
                {...register('beneApellidos', {
                  // validate: validateRequired('beneApellidos'),
                })}
              ></FormInput>
              <FormError error={errors.beneApellidos} />
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
            <div className="mb-6">
              <label
                htmlFor="cantidad"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Monto
              </label>
              <FormInput
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="cantidad"
                placeholder="Ingrese un monto"
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
                  validate: validateRequiredNumber('cantidad'),
                })}
              ></FormInput>
              <FormError error={errors.comision} />
            </div>
            <div className="mb-6">
              <label
                htmlFor="obs"
                className="block mb-2 text-lg font-medium text-sideblue dark:text-gray-300"
              >
                Observación
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
          <Button type="submit">Enviar Trasferencia</Button>
        </div>
      </form>
    </div>
  );
};

export default crearTransferencias;
