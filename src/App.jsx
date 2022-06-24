import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Navbar from './components/Navbar';
import RequiereAuth from './components/RequiereAuth';
import Register from './routes/Register';
const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <RequiereAuth>
              <Home />
            </RequiereAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
