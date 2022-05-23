import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import axios, {AxiosError} from 'axios';
import {api} from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {ISignInData} from '../dtos';

interface IAuthContextProps {
  children: ReactNode;
}

interface IAuthContext {
  user: IUser;
  signIn: (credentials: ISignInData) => Promise<void>;
  signOut: () => void;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  birthday: string;
  gender: string;
}

interface IStorageUserData {
  data: IUser;
  authorization: string;
}

type TServerError = {
  errors: {
    message: string;
  };
};

const userStorageKey = '@ioasysbooks:user';

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({children}: IAuthContextProps) => {
  const [user, setUser] = useState({} as IUser);

  const signIn = async ({email, password}: ISignInData) => {
    try {
      const response = await api.post('/auth/sign-in', {email, password});

      const {
        data: userData,
        headers: {authorization},
      } = response;

      api.defaults.headers.common.Authorization = `Bearer ${authorization}`;

      setUser(userData);

      const formattedUserData = {
        data: userData,
        authorization,
      };

      await AsyncStorage.setItem(
        userStorageKey,
        JSON.stringify(formattedUserData),
      );
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<TServerError>;

        throw new Error(serverError.response?.data.errors.message);
      }

      throw new Error('Erro ao realizar login, tente novamente mais tarde!');
    }
  };

  const signOut = () => {
    setUser({} as IUser);
    AsyncStorage.removeItem(userStorageKey);
  };

  const loadUserFromStorage = async () => {
    const userStoraged = await AsyncStorage.getItem(userStorageKey);

    if (!userStoraged) {
      return;
    }

    const {data: loggedUser, authorization} = JSON.parse(
      userStoraged,
    ) as IStorageUserData;

    api.defaults.headers.common.Authorization = `Bearer ${authorization}`;
    setUser(loggedUser);
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export {AuthProvider, useAuth};
