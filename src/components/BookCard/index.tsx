import React, {memo} from 'react';

import {IBookData} from '../../dtos';

import bookPlaceholder from '../../assets/images/book-placeholder.png';

import * as S from './styles';

interface BookCardProps {
  book: IBookData;
}

const BookCardComponent = ({book}: BookCardProps) => {
  return (
    <S.Container>
      <S.BookImageWrapper>
        <S.BookImage
          source={book.imageUrl ? {uri: book.imageUrl} : bookPlaceholder}
          resizeMode="contain"
        />
      </S.BookImageWrapper>

      <S.BookDetailsWrapper>
        <S.BookDetailsHeader>
          <S.Title>{book.title}</S.Title>
          <S.Authors>{book.authors.join(', ')}</S.Authors>
        </S.BookDetailsHeader>

        <S.BookDetailsBody>
          <S.PageCount>{book.pageCount} páginas</S.PageCount>
          <S.Publisher>{book.publisher}</S.Publisher>
          <S.PublishedAt>Publicado em {book.published}</S.PublishedAt>
        </S.BookDetailsBody>
      </S.BookDetailsWrapper>
    </S.Container>
  );
};

export const BookCard = memo(BookCardComponent);
