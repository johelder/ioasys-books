import React from 'react';
import {
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import Logo from '../../assets/images/logo-white.svg';
import backgroundImage from '../../assets/images/background-image.png';

import * as S from './styles';

export const Login = () => {
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
                <S.EmailInputWrapper>
                  <S.EmailLabel>Email</S.EmailLabel>
                  <S.EmailInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                  />
                </S.EmailInputWrapper>

                <S.PasswordInputWrapper>
                  <S.PasswordInputContent>
                    <S.PasswordLabel>Senha</S.PasswordLabel>
                    <S.PasswordInput secureTextEntry />
                  </S.PasswordInputContent>

                  <S.SignInButton>
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
