import styled from 'styled-components/native';
import {theme as Theme} from '../../styles/theme';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
})`
  height: 100%;
  width: 100%;

  padding: 16px;
`;

export const LogoWrapper = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;

  margin-bottom: 50px;
`;

export const LogoTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_300};
  font-size: 28px;

  color: ${({theme}) => theme.colors.light}

  margin-left: 16px;
`;

export const SignInFormWrapper = styled.View``;

export const EmailInputWrapper = styled.View`
  background-color: ${({theme}) => theme.colors.overlay_secondary};
  border-radius: 4px;
  padding: 8px 16px;

  justify-content: center;
`;

export const PasswordInputWrapper = styled(EmailInputWrapper)`
  margin-top: 16px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PasswordInputContent = styled.View`
  flex: 1;
`;

export const SignInButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({theme}) => theme.colors.light};
  border-radius: 40px;

  padding: 8px 20px;
`;

export const SignInButtonText = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 16px;

  color: ${({theme}) => theme.colors.primary};
`;

export const LoadingIcon = styled.ActivityIndicator.attrs({
  color: Theme.colors.primary,
})``;
