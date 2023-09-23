import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

export const PrivateRoute = ({children}) => {
  const {user} = useAuth0();

  return (
    <div>
       {user? children: <Navigate to="/" replace={true}/>}
    </div>
  )
};
