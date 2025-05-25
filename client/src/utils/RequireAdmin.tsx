import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../components/Redux/store'


import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const RequireAdmin: React.FC<Props> = ({ children }) => {

        const user = useSelector((state: RootState) => state.user.user)

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
