import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  height: 160px;

  flex-direction: row;

  padding: 16px 0 19px 16px;
  margin-top: 16px;

  background-color: ${({theme}) => theme.colors.light};
`;

export const BookImageWrapper = styled.View`
  width: 30%;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BookDetailsWrapper = styled.View`
  width: 70%;
  padding: 0 16px;

  justify-content: space-between;
`;

export const BookDetailsHeader = styled.View``;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 14px;

  color ${({theme}) => theme.colors.dark};
`;

export const Authors = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  color: ${({theme}) => theme.colors.secondary};
`;

export const BookDetailsBody = styled.View``;

export const PageCount = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  color: ${({theme}) => theme.colors.light_gray};
`;

export const Publisher = styled(PageCount)``;

export const PublishedAt = styled(PageCount)``;
