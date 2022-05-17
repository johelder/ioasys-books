import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  width: 32px;
  height: 32px;

  border-radius: 16px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.border};

  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialIcon)`
  color: ${({theme}) => theme.colors.dark};
`;
