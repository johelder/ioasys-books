import React from 'react';
import {IFilter} from '../../dtos';
import {useFilter} from '../../hooks/filter';

import * as S from './styles';

interface IFilterButtonProps {
  filter: IFilter;
}

export const FilterButton = ({filter}: IFilterButtonProps) => {
  const {filters, toggleFilters} = useFilter();

  const handleToggleFilter = () => {
    toggleFilters(filter);
  };

  return (
    <S.Container marked={filters.includes(filter)} onPress={handleToggleFilter}>
      <S.Label marked={filters.includes(filter)}>{filter.name}</S.Label>
    </S.Container>
  );
};
