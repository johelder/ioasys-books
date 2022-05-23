import React, {ReactNode} from 'react';
import {AuthProvider} from './auth';
import {FilterProvider} from './filter';

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({children}: IAppProviderProps) => {
  return (
    <AuthProvider>
      <FilterProvider>{children}</FilterProvider>
    </AuthProvider>
  );
};
