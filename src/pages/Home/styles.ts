import styled from 'styled-components/native';

import {FlatList, FlatListProps} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {theme as Theme} from '../../styles/theme';
import {IBookData} from '../../dtos';

export const Container = styled.SafeAreaView`
  flex: 1;

  background-color: ##f6f5ef;
`;

export const Content = styled.View`
  width: 100%;
  height: 100%;

  padding: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_300};
  font-size: 28px;

  color: ${({theme}) => theme.colors.dark}

  margin-left: 16px;
`;

export const SearchWrapper = styled.View`
  width: 100%;

  margin: 30px 0 10px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SearchInputWrapper = styled.View`
  height: 50px;

  padding: 0 16px;
  margin-right: 22px;

  border-width: 1px;
  border-color: ${({theme}) => theme.colors.border};
  border-radius: 2px;

  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SearchInput = styled.TextInput`
  flex: 1;

  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 12px;

  color: ${({theme}) => theme.colors.placeholder};
`;

export const SearchIconWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const SearchIcon = styled(MaterialIcon)`
  color: ${({theme}) => theme.colors.dark};
`;

export const FilterWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const ListWrapper = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const LoadingBooks = styled.ActivityIndicator.attrs({
  color: Theme.colors.primary,
})``;

export const LoadingMoreBooks = styled.ActivityIndicator.attrs({
  color: Theme.colors.primary,
})`
  margin-top: 10px;
`;

export const BooksList = styled(
  FlatList as new (props: FlatListProps<IBookData>) => FlatList<IBookData>,
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ErrorLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.attention};
`;
