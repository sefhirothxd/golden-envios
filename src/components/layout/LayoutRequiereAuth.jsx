import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';
const LayoutRequiereAuth = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default LayoutRequiereAuth;
