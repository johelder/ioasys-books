import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {ISignInData} from '../dtos';
import {api} from '../services/api';
import axios, {AxiosError} from 'axios';

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

  const revalidateAuthorizationToken = () => {
    api.interceptors.response.use(
      response => response,
      error => {
        return new Promise(async (resolve, reject) => {
          const originalRequest = error.config;
          const shouldRevalidateAuthorizationToken =
            error.response.status === 401 &&
            error.config &&
            !error.config.retry;

          if (!shouldRevalidateAuthorizationToken) {
            reject(error);
            return;
          }

          originalRequest.retry = true;
          const userStorageData = await AsyncStorage.getItem(userStorageKey);

          if (!userStorageData) {
            return;
          }

          const {data: userData, authorization} = JSON.parse(
            userStorageData,
          ) as IStorageUserData;

          const response = await api.post('/auth/refresh-token', {
            refreshToken: authorization,
          });

          const formattedUserData = {
            data: userData,
            authorization: response.data['refresh-token'],
          };

          await AsyncStorage.setItem(
            userStorageKey,
            JSON.stringify(formattedUserData),
          );

          originalRequest.headers.Authorization = `Bearer ${response.data['refresh-token']}`;

          api(originalRequest);

          return resolve(response);
        });
      },
    );
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    revalidateAuthorizationToken();
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
