import React, {createContext, ReactNode, useContext, useState} from 'react';
import {IBookData, IFilter} from '../dtos';
import {toast} from '../utils/toast';

interface IFilterContext {
  filters: IFilter[];
  toggleFilters: (filter: IFilter) => void;
  getFilteredList: (list: IBookData[]) => Array<IBookData> | undefined;
}

interface IFilterContextProps {
  children: ReactNode;
}

const FilterContext = createContext({} as IFilterContext);

const FilterProvider = ({children}: IFilterContextProps) => {
  const [filters, setFilters] = useState<IFilter[]>([]);

  const toggleFilters = (filter: IFilter) => {
    const updatedFiltersList = [...filters];

    if (updatedFiltersList.includes(filter)) {
      const filterIndex = updatedFiltersList.indexOf(filter);
      updatedFiltersList.splice(filterIndex, 1);

      setFilters(updatedFiltersList);
      return;
    }

    updatedFiltersList.push(filter);
    setFilters(updatedFiltersList);
  };

  const getFilteredList = (list: IBookData[]) => {
    const currentFilters = filters.map(filter => filter.name);
    const filteredList = list.filter(
      book =>
        currentFilters.includes(book.category) ||
        currentFilters.includes(String(book.published)),
    );

    if (!filteredList.length) {
      toast('Ops! Não encontramos livros para esses filtros.');
      return;
    }

    return filteredList;
  };

  return (
    <FilterContext.Provider value={{filters, toggleFilters, getFilteredList}}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  return useContext(FilterContext);
};

export {FilterProvider, useFilter};
