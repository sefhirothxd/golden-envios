import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';

const LayoutContainerForm = () => {
  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LayoutContainerForm;
