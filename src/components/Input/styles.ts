import styled from 'styled-components/native';
import {TextInput} from 'react-native';

export const Container = styled.View``;

export const InputLabelWrapper = styled.View`
  flex-direction: row;
`;

export const InputLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  color: ${({theme}) => theme.colors.label};
`;

export const Input = styled(TextInput)`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  color: ${({theme}) => theme.colors.light};
  padding: 4px 0;
`;

export const ErrorLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 12px;

  color: ${({theme}) => theme.colors.attention};
  margin-left: 10px;
`;
