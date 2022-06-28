import React from 'react';
import Logo from '../assets/img/logoLogin.svg';
const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center  overflow-hidden">
      <div className="w-full flex justify-center mb-8">
        <img src={Logo} alt="logo golden fast" className="w-44" />
      </div>
      <h1 className="text-5xl mb-5 font-bold text-botton-blue">404</h1>
      <p className="font-bold text-lg">Ruta desconocida</p>
    </div>
  );
};

export default NotFound;
