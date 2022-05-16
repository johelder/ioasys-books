import React, {useState} from 'react';
import {TextInputProps} from 'react-native';

import {Control, Controller} from 'react-hook-form';

import {ISignInData} from '../../dtos';

import * as S from './styles';

export interface IInputProps extends TextInputProps {
  name: string;
  label: string;
  error: string | undefined;
  control: Control<ISignInData | any>;
}

export const Input = ({name, label, error, control, ...rest}: IInputProps) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = (value: string) => {
    setIsFilled(!!value);
  };

  return (
    <S.Container>
      <S.InputLabelWrapper>
        <S.InputLabel>{label}</S.InputLabel>
        {!isFilled && <S.ErrorLabel>{error}</S.ErrorLabel>}
      </S.InputLabelWrapper>
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
    </S.Container>
  );
};
