import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StackAppRoutes} from './app.stack.routes';

import {useAuth} from '../hooks/auth';
import {StackAuthRoutes} from './auth.stack.routes';

export const Routes = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      {!user.id ? <StackAppRoutes /> : <StackAuthRoutes />}
    </NavigationContainer>
  );
};
