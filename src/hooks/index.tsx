import React, {ReactNode} from 'react';
import {AuthProvider} from './auth';

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({children}: IAppProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
