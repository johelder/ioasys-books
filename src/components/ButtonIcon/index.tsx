import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import * as S from './styles';

interface IButtonIconProps extends TouchableOpacityProps {
  type: 'logout' | 'close' | 'back';
}

export const ButtonIcon = ({type, onPress}: IButtonIconProps) => {
  const icons = {
    logout: 'logout',
    close: 'close',
    back: 'arrow-back',
  };

  return (
    <S.Container onPress={onPress}>
      <S.Icon name={icons[type]} size={16} />
    </S.Container>
  );
};
