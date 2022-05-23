import styled from 'styled-components/native';

interface IFilterButtonStyleProps {
  marked: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<IFilterButtonStyleProps>`
  width: auto;
  height: 32px;

  padding: 0 16px;

  margin: 8px 8px 0 0;

  border-radius: 44px;
  border-width: 1px;
  border-color: ${({marked, theme}) =>
    marked ? theme.colors.dark : theme.colors.border}

  background-color: ${({marked, theme}) =>
    marked ? theme.colors.dark : theme.colors.light};


  align-self: center;
  justify-content: center;
`;

export const Label = styled.Text<IFilterButtonStyleProps>`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  color: ${({marked, theme}) =>
    marked ? theme.colors.light : theme.colors.dark};
`;
