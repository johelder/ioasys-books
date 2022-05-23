import React, {useEffect, useState, useCallback} from 'react';
import {ListRenderItemInfo} from 'react-native';

import {useAuth} from '../../hooks/auth';
import {useFilter} from '../../hooks/filter';

import {api} from '../../services/api';
import {IBookData, TPageStatus} from '../../dtos';

import {BookCard, ButtonIcon, FilterModal} from '../../components';

import Logo from '../../assets/images/logo-black.svg';
import FilterIcon from '../../assets/images/filter-icon.svg';

import * as S from './styles';

export const Home = () => {
  const [pageStatus, setPageStatus] = useState<TPageStatus>('idle');
  const [booksList, setBooksList] = useState<IBookData[]>([]);
  const [ListOfAllBooks, setListOfAllBooks] = useState<IBookData[]>([]);
  const [searchBook, setSearchBook] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalOfPages, setTotalOfPages] = useState(0);

  const [toggleFilterModal, setToggleFilterModal] = useState(false);

  const {signOut} = useAuth();
  const {filters, getFilteredList} = useFilter();

  const getBooks = useCallback(async () => {
    try {
      if (totalOfPages && currentPage > totalOfPages) {
        return;
      }

      if (filters.length > 0) {
        return;
      }

      const response = !searchBook
        ? await api.get(`/books/?page=${currentPage}`)
        : await api.get(`/books/?page=${currentPage}&title=${searchBook}`);

      setCurrentPage(response.data.page + 1);
      setTotalOfPages(response.data.totalPages);

      setBooksList(prevState => [...prevState, ...response.data.data]);
      setPageStatus('success');
    } catch {
      setPageStatus('error');
    }
  }, [currentPage, filters.length, searchBook, totalOfPages]);

  const getAllBooks = useCallback(async () => {
    try {
      const response = await api.get('/books/?page=1&amount=500');

      setListOfAllBooks(response.data.data);
    } catch {
      setPageStatus('error');
    }
  }, []);

  const handleSearchBook = (searchText: string) => {
    setSearchBook(searchText);
  };

  const searchBooks = async () => {
    try {
      setPageStatus('loading');
      const response = await api.get(`/books/?page=1&title=${searchBook}`);

      setCurrentPage(response.data.page + 1);
      setTotalOfPages(response.data.totalPages);

      setBooksList([...response.data.data]);
      setPageStatus('success');
    } catch {
      setPageStatus('error');
    }
  };

  const handleToggleFilterModal = useCallback(() => {
    setToggleFilterModal(prevState => !prevState);
  }, []);

  const filterList = useCallback(() => {
    const filteredList = getFilteredList(ListOfAllBooks);

    if (!filteredList) {
      return;
    }

    setBooksList(filteredList);
    setCurrentPage(1);
    setTotalOfPages(0);
  }, [ListOfAllBooks, getFilteredList]);

  useEffect(() => {
    setPageStatus('loading');
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  const renderBookCard = useCallback(
    ({item: book}: ListRenderItemInfo<IBookData>) => {
      return <BookCard book={book} />;
    },
    [],
  );

  const renderLoadingMoreData = useCallback(() => {
    if (currentPage > totalOfPages) {
      return null;
    }

    return <S.LoadingMoreBooks />;
  }, [currentPage, totalOfPages]);

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.LogoWrapper>
            <Logo />
            <S.LogoTitle>Books</S.LogoTitle>
          </S.LogoWrapper>

          <ButtonIcon type="logout" onPress={signOut} />
        </S.Header>

        <S.SearchWrapper>
          <S.SearchInputWrapper>
            <S.SearchInput
              placeholder="Procure um livro"
              value={searchBook}
              onChangeText={handleSearchBook}
              onSubmitEditing={searchBooks}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <S.SearchIconWrapper onPress={searchBooks}>
              <S.SearchIcon name="search" size={20} />
            </S.SearchIconWrapper>
          </S.SearchInputWrapper>

          <S.FilterWrapper onPress={handleToggleFilterModal}>
            <FilterIcon />
          </S.FilterWrapper>
        </S.SearchWrapper>

        {pageStatus === 'loading' && (
          <S.ListWrapper>
            <S.LoadingBooks />
          </S.ListWrapper>
        )}

        {pageStatus === 'success' && (
          <S.BooksList
            data={booksList}
            keyExtractor={(book: IBookData) => book.id}
            renderItem={renderBookCard}
            scrollEventThrottle={16}
            onEndReached={getBooks}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderLoadingMoreData}
          />
        )}

        {pageStatus === 'error' && (
          <S.ListWrapper>
            <S.ErrorLabel>
              Ops! Ocorreu um erro ao carregar os livros!
            </S.ErrorLabel>
          </S.ListWrapper>
        )}
      </S.Content>

      <FilterModal
        isOpen={toggleFilterModal}
        closeFilterModal={handleToggleFilterModal}
        filterList={filterList}
      />
    </S.Container>
  );
};
