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

import {useAuth} from '../../hooks/auth';
import {ISignInData} from '../../dtos';
import {toast} from '../../utils/toast';

import Logo from '../../assets/images/logo-white.svg';
import backgroundImage from '../../assets/images/background-image.png';

import {Input} from '../../components/Input';

import * as S from './styles';

const schema = yup.object().shape({
  email: yup.string().required('Email obrigatório!').email('Email inválido!'),
  password: yup.string().required('Senha obrigatória!'),
});

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignInData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {signIn} = useAuth();

  const onSubmit = async (signInData: ISignInData) => {
    try {
      await schema.validate(signInData);
      await signIn(signInData);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toast(error.message);
        return;
      }

      toast(String(error));
    }
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

              <S.SignInFormWrapper>
                <S.EmailInputWrapper>
                  <Input
                    name="email"
                    label="Email"
                    error={errors.email?.message}
                    control={control}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                  />
                </S.EmailInputWrapper>

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
              </S.SignInFormWrapper>
            </S.Content>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </S.Container>
    </>
  );
};
