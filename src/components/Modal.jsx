import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Button } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { useFirestoreState } from "../hooks/useFirestore";
import Logo from "../assets/img/logoLogin.svg";
import printJS from "print-js";
import Swal from "sweetalert2";
import "./modal.css";

const Modal = ({ children }) => {
  const { setModal, refreshTrasferencias, refreshTrasfereZona, user } =
    useContext(UserContext);
  let { pathname } = useLocation();
  const {
    data,
    loading,
    error,
    getData,
    addData,
    getUserInfo,
    dataUser,
    getDataZona,
    updateEstate,
    updateDataRestarSaldo,
  } = useFirestoreState();

  const someJSONdata = () => {
    //print react component to pdf
    printJS({
      printable: document.getElementById("probando-pdf"),
      properties: [
        {
          name: "width",
          value: "100px",
        },
        {
          name: "height",
          value: "100%",
        },
      ],
      type: "html",
      style:
        "body {color: black; font-family: 'Inconsolata', monospace;} .advertising{width: 250px!important } .h3{font-size: 30px!important; font-weight: 500; line-height: 1.2; color: pink; text-align: center;} img{width: 150px !important; height: auto; margin-left:70px;}",
      showModal: true,
    });
  };
  const changeEstate = async (e) => {
    console.log("funciono", children);
    const nuevoSaldo = user.saldo - (children.monto + children.comision);
    if (nuevoSaldo < 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No puede tener saldo negativo",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    console.log("saldo actual : ", user.saldo);
    console.log("saldo nuevo : ", nuevoSaldo);
    await updateEstate(children.nanoid, e);
    await updateDataRestarSaldo(user.nanoid, nuevoSaldo);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Pago relizado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    refreshTrasferencias();
    refreshTrasfereZona();
    setModal(false);
  };
  const fecha = () => {
    return new Date().toLocaleString();
  };
  return (
    <div className="pdf-voucher absolute h-screen z-20 flex justify-center items-center w-full bg-black bg-opacity-60">
      <div id="probando-pdf" className="-z-10 absolute">
        <img src={Logo} className="img-logo" alt="logo" />
        <h3 className="title">Golden Fast</h3>
        <p className="advertising">
          Pagos de Letra, Transferencia, Depósitos, Giros Nacionales, Pagos
          Móviles, DIRECTV, FREEFIRE,YAPE, Retiros, Giros a Oficinas Y MÁS...
        </p>
        <hr />
        <div>
          <p>Fecha: {fecha()}</p>
          <p>Destino: {children.origen} </p>
          <p>
            Solicitante:{" "}
            {children.nomSolicitante + " " + children.soliApellidos}
          </p>
          <p>
            Beneficiario:{" "}
            {children.nomBeneficiario + " " + children.beneApellidos}
          </p>
          <p>
            Monto: S/
            {children.monto.toLocaleString("en-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div className="bg-white w-full max-w-3xl px-10 rounded-xl relative">
        <div className="modal-header">
          <div className="flex justify-end px-2 py-5">
            <button
              className="modal-close-btn absolute top-2 right-5 text-2xl font-bold"
              onClick={() => setModal(false)}
            >
              X
            </button>
          </div>
          <div className="flex justify-between items-center" id="probando">
            <div className="">
              <h3 className="font-medium text-xl text-black mb-5 text-center">
                Origen
              </h3>
              <div>
                <div>
                  <h4 className="font-medium text-xl text-black">
                    Fecha de envio
                  </h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.fechaCreada.toDate().toLocaleDateString() +
                      " " +
                      children.fechaCreada.toDate().toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">Origen</h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.origen}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">Asesor</h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.asesor}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">Monto</h4>
                  <p className="font-normal text-lg text-gray-500">
                    S/
                    {children.monto.toLocaleString("en-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">Comision</h4>
                  <p className="font-normal text-lg text-gray-500">
                    S/
                    {children.comision.toLocaleString("en-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">
                    Observacion
                  </h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.obs}
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="font-medium text-xl text-black mb-5 text-center">
                Destinatario
              </h3>
              <div>
                <div>
                  <h4 className="font-medium text-xl text-black">DNI / RUC</h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.dniSoli}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">Nombres</h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.nomSolicitante + " " + children.soliApellidos}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">DNI / RUC</h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.dniBene}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">Nombres</h4>
                  <p className="font-normal text-lg text-gray-500">
                    {children.nomBeneficiario + " " + children.beneApellidos}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black">Detalle</h4>
                  <input className="bg-white-fondo h-4 p-3 " type="text" />
                </div>
                <div className="h-14"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5 mb-5">
            {pathname === "/TransferenciasCreadas" ? (
              children.estado === "Pendiente" ? (
                <>
                  <Button onClick={someJSONdata}>Imprimir</Button>
                  <Button onClick={() => changeEstate("Extornado")}>
                    Extornar
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={someJSONdata}>Imprimir</Button>
                </>
              )
            ) : children.estado === "Pendiente" ? (
              <>
                <Button onClick={someJSONdata}>Imprimir</Button>
                <Button onClick={() => changeEstate("Pagado")}>Pagar</Button>
              </>
            ) : (
              <>
                <Button onClick={someJSONdata}>Imprimir</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
