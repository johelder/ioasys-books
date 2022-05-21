import React, {useCallback, useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';

import {ButtonIcon} from '../../components';

import QuoteIcon from '../../assets/images/quote-icon.svg';
import bookPlaceholder from '../../assets/images/book-placeholder.png';

import {api} from '../../services/api';
import {IBookData, TPageStatus} from '../../dtos';

import * as S from './styles';

interface IRouteParams {
  route: RouteProp<
    {
      params: {
        bookId: string;
      };
    },
    'params'
  >;
}

export const BookDetails = ({route}: IRouteParams) => {
  const [pageStatus, setPageStatus] = useState<TPageStatus>('idle');
  const [book, setBook] = useState({} as IBookData);

  const navigation = useNavigation();
  const {bookId} = route.params;

  const getBook = useCallback(async () => {
    try {
      setPageStatus('loading');
      const response = await api.get(`/books/${bookId}`);

      setBook(response.data);
      setPageStatus('success');
    } catch {
      setPageStatus('error');
    }
  }, [bookId]);

  useEffect(() => {
    getBook();
  }, [getBook]);

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <ButtonIcon type="back" onPress={() => navigation.goBack()} />
        </S.Header>

        {pageStatus === 'loading' && (
          <S.MainWrapper>
            <S.Loading />
          </S.MainWrapper>
        )}

        {pageStatus === 'success' && (
          <S.MainWrapper>
            <S.BookImageWrapper>
              <S.BookImage
                source={book.imageUrl ? {uri: book.imageUrl} : bookPlaceholder}
              />
            </S.BookImageWrapper>

            <S.BookInformationWrapper>
              <S.InformationHeader>
                <S.Title>{book.title}</S.Title>
                <S.Authors>{book.authors.join(', ')}</S.Authors>
              </S.InformationHeader>

              <S.BookInformationContent>
                <S.Topic>informações</S.Topic>

                <S.TopicWrapper>
                  <S.TopicKey>Páginas</S.TopicKey>
                  <S.TopicValue>{book.pageCount}</S.TopicValue>
                </S.TopicWrapper>

                <S.TopicWrapper>
                  <S.TopicKey>Editora</S.TopicKey>
                  <S.TopicValue>{book.publisher}</S.TopicValue>
                </S.TopicWrapper>

                <S.TopicWrapper>
                  <S.TopicKey>Publicação</S.TopicKey>
                  <S.TopicValue>{book.published}</S.TopicValue>
                </S.TopicWrapper>

                <S.TopicWrapper>
                  <S.TopicKey>Idioma</S.TopicKey>
                  <S.TopicValue>{book.language}</S.TopicValue>
                </S.TopicWrapper>

                <S.TopicWrapper>
                  <S.TopicKey>Título Original</S.TopicKey>
                  <S.TopicValue>{book.title}</S.TopicValue>
                </S.TopicWrapper>

                <S.TopicWrapper>
                  <S.TopicKey>ISBN-10</S.TopicKey>
                  <S.TopicValue>{book.isbn10}</S.TopicValue>
                </S.TopicWrapper>

                <S.TopicWrapper>
                  <S.TopicKey>ISBN-13</S.TopicKey>
                  <S.TopicValue>{book.isbn13}</S.TopicValue>
                </S.TopicWrapper>

                <S.TopicWrapper>
                  <S.TopicKey>Categoria</S.TopicKey>
                  <S.TopicValue>{book.category}</S.TopicValue>
                </S.TopicWrapper>

                <S.Topic>resenha da editora</S.Topic>
                <S.ReviewWrapper>
                  <QuoteIcon />
                  <S.ReviewContent>{book.description}</S.ReviewContent>
                </S.ReviewWrapper>
              </S.BookInformationContent>
            </S.BookInformationWrapper>
          </S.MainWrapper>
        )}

        {pageStatus === 'error' && (
          <S.ErrorLabel>
            Ops! Não foi possível carregar este livro!
          </S.ErrorLabel>
        )}
      </S.Content>
    </S.Container>
  );
};
