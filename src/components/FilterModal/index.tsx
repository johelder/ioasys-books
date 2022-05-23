import React, {useCallback} from 'react';
import {ListRenderItemInfo} from 'react-native';

import {IFilter} from '../../dtos';

import {ButtonIcon, FilterButton} from '../../components';

import {categories, years} from './data';

import * as S from './styles';

interface IFilterModalProps {
  isOpen: boolean;
  closeFilterModal: () => void;
  filterList: () => void;
}

export const FilterModal = ({
  isOpen,
  closeFilterModal,
  filterList,
}: IFilterModalProps) => {
  const handleFilterList = () => {
    filterList();
    closeFilterModal();
  };

  const renderFilter = useCallback(
    ({item: filter}: ListRenderItemInfo<IFilter>) => {
      return <FilterButton filter={filter} />;
    },
    [],
  );

  const renderFilterHeader = useCallback((title: string) => {
    return <S.FilterHeader>{title}</S.FilterHeader>;
  }, []);

  return (
    <>
      {isOpen && (
        <S.Container>
          <S.Overlay onPress={closeFilterModal} />
          <S.Content>
            <S.ModalHeader>
              <ButtonIcon type="close" onPress={closeFilterModal} />
            </S.ModalHeader>

            <S.CategoriesList
              data={categories}
              keyExtractor={(category: IFilter) => String(category.id)}
              renderItem={renderFilter}
              ListHeaderComponent={renderFilterHeader('Selecione a categoria')}
              scrollEnabled={false}
              numColumns={3}
              key={3}
            />

            <S.YearsList
              data={years}
              keyExtractor={(year: IFilter) => String(year.id)}
              renderItem={renderFilter}
              ListHeaderComponent={renderFilterHeader('Selecione o ano')}
              scrollEnabled={false}
              numColumns={4}
              key={4}
            />

            <S.FilterButtonWrapper onPress={handleFilterList}>
              <S.FilterButtonLabel>Filtrar</S.FilterButtonLabel>
            </S.FilterButtonWrapper>
          </S.Content>
        </S.Container>
      )}
    </>
  );
};
