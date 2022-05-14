import React, {useState} from 'react';
import {TextInputProps} from 'react-native';

import {Control, Controller} from 'react-hook-form';
import {ILoginProps} from '../../pages/Login';

import * as S from './styles';

export interface IInputProps extends TextInputProps {
  name: string;
  label: string;
  error: string | undefined;
  control: Control<ILoginProps | any>;
}

export const Input = ({name, label, error, control, ...rest}: IInputProps) => {
  const [isFilled, setIsFilled] = useState(false);

  function handleInputBlur(value: string) {
    setIsFilled(!!value);
  }

  return (
    <S.Container>
      <S.InputLabel>{label}</S.InputLabel>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}}) => (
          <S.Input
            value={value}
            onChangeText={onChange}
            onBlur={() => handleInputBlur(value)}
            {...rest}
          />
        )}
      />
      {!isFilled && <S.ErrorLabel>{error}</S.ErrorLabel>}
    </S.Container>
  );
};
