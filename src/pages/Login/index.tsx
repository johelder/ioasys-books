import React from 'react';
import {
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import * as yup from 'yup';

import Logo from '../../assets/images/logo-white.svg';
import backgroundImage from '../../assets/images/background-image.png';

import * as S from './styles';
import {Input} from '../../components/Input';

export interface ILoginProps {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Email obrigatório!').email('Email inválido!'),
  password: yup.string().required('Senha obrigatória!'),
});

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (loginData: ILoginProps) => {
    console.log(loginData);
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={backgroundImage}>
            <S.Content>
              <S.LogoWrapper>
                <Logo />
                <S.LogoTitle>Books</S.LogoTitle>
              </S.LogoWrapper>

              <S.LoginFormWrapper>
                <S.InputWrapper>
                  <Input
                    name="email"
                    label="Email"
                    error={errors.email?.message}
                    control={control}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                  />
                </S.InputWrapper>

                <S.PasswordInputWrapper>
                  <S.PasswordInputContent>
                    <Input
                      name="password"
                      label="Senha"
                      error={errors.password?.message}
                      control={control}
                      secureTextEntry
                    />
                  </S.PasswordInputContent>

                  <S.SignInButton onPress={handleSubmit(onSubmit)}>
                    <S.SignInButtonText>Entrar</S.SignInButtonText>
                  </S.SignInButton>
                </S.PasswordInputWrapper>
              </S.LoginFormWrapper>
            </S.Content>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </S.Container>
    </>
  );
};
