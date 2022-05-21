import styled from 'styled-components/native';

import {theme as Theme} from '../../styles/theme';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView`
  padding: 15px;
`;

export const Header = styled.View``;

export const MainWrapper = styled.View`
  height: 100%;

  align-items: center;
  justify-content: center;

  padding: 0 25px;
`;

export const BookImageWrapper = styled.View`
  width: 100%;
  height: 400px;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BookInformationWrapper = styled.View`
  width: 100%;

  align-items: center;
  margin-top: 24px;
`;

export const InformationHeader = styled.View``;

export const Title = styled.Text.attrs({numberOfLines: 2})`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 28px;

  text-align: center;

  color: ${({theme}) => theme.colors.dark};
`;

export const Authors = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  text-align: center;

  color: ${({theme}) => theme.colors.secondary};
`;

export const BookInformationContent = styled.View`
  margin-top: 15px;
`;

export const Topic = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 12px;

  color: ${({theme}) => theme.colors.dark};
  text-transform: uppercase;

  margin: 15px 0;
`;

export const TopicWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 5px;
`;

export const TopicKey = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 12px;

  color: ${({theme}) => theme.colors.dark};
`;

export const TopicValue = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  color: ${({theme}) => theme.colors.light_gray};
`;

export const ReviewWrapper = styled.View``;

export const ReviewContent = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: 12px;

  color: ${({theme}) => theme.colors.light_gray};
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: Theme.colors.primary,
})``;

export const ErrorLabel = styled.Text``;
