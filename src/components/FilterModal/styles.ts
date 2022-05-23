import styled from 'styled-components/native';
import {FlatList, FlatListProps} from 'react-native';

import {IFilter} from '../../dtos';

export const Container = styled.View`
  position: absolute;

  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.TouchableOpacity`
  position: absolute;

  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  elevation: 1;
  z-index: 1;

  background-color: ${({theme}) => theme.colors.overlay_primary};
`;

export const Content = styled.View`
  width: 90%;
  min-height: 435px;

  background-color: ${({theme}) => theme.colors.light}

  elevation: 2;
  z-index: 2;

  padding: 16px;
`;

export const ModalHeader = styled.View`
  padding-top: 16px;

  border-radius: 4px;
  align-items: flex-end;
`;

export const CategoriesList = styled(
  FlatList as new (props: FlatListProps<IFilter>) => FlatList<IFilter>,
).attrs({
  showsVerticalScrollIndicator: false,
  columnWrapperStyle: {flexWrap: 'wrap'},
})``;

export const YearsList = styled(
  FlatList as new (props: FlatListProps<IFilter>) => FlatList<IFilter>,
).attrs({
  showsVerticalScrollIndicator: false,
  columnWrapperStyle: {flexWrap: 'wrap'},
})`
  margin-top: 30px;
`;

export const FilterHeader = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 12px;

  color: ${({theme}) => theme.colors.dark};

  padding-bottom: 4px;
`;

export const FilterButtonWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin: 30px 0 20px;
  padding: 8px 24px;

  border-radius: 44px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.primary};

  align-self: center;
`;

export const FilterButtonLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: 16px;

  color: ${({theme}) => theme.colors.primary};
`;
