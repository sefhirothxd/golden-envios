import { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logoLogin.svg';
import Mundo from '../assets/img/mundo2.png';
const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(UserContext);

  const navegate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log('Usuario logeado');
    } catch (error) {
      console.log(error.code);
      alert(error.code);
    }
  };
  return (
    <div className="h-screen flex justify-evenly items-center  overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full xl:w-1/3 justify-center items-center"
      >
        <div className="w-full flex justify-center mb-8">
          <img src={Logo} alt="logo golden fast" className="w-44" />
        </div>
        <input
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          type="email"
          name="email"
          placeholder="Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-white-fondo p-3 rounded-2xl w-11/12 xs:w-96 mb-5"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
