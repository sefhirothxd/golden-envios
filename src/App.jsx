import React, { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Perfil from './routes/Perfil';
import Register from './routes/Register';
import LayoutRequiereAuth from './components/layout/LayoutRequiereAuth';
import LayoutContainerForm from './components/layout/LayoutContainerForm';
import NotFound from './routes/NotFound';
import CrearTransferencias from './routes/CrearTransferencias';
import TransferenciasCreadas from './routes/TransferenciasCreadas';
import TransferenciasRecibidas from './routes/TransferenciasRecibidas';
import EnvioCaja from './routes/EnvioCaja';
const App = () => {
  const { user } = useContext(UserContext);
  if (user === false) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LayoutRequiereAuth />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/crearTransferencias"
            element={<CrearTransferencias />}
          />
          <Route
            path="/TransferenciasCreadas"
            element={<TransferenciasCreadas />}
          />
          <Route
            path="/TransferenciasRecibidas"
            element={<TransferenciasRecibidas />}
          />
          <Route path="/envioCaja" element={<EnvioCaja />} />
        </Route>
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
