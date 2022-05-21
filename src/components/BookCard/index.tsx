import React, {memo} from 'react';

import {IBookData} from '../../dtos';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/auth.stack.routes';

import bookPlaceholder from '../../assets/images/book-placeholder.png';

import * as S from './styles';

interface BookCardProps {
  book: IBookData;
}

type BookDetailsPage = NativeStackNavigationProp<
  RootStackParamList,
  'BookDetails'
>;

const BookCardComponent = ({book}: BookCardProps) => {
  const navigation = useNavigation<BookDetailsPage>();

  return (
    <S.Container
      onPress={() => navigation.navigate('BookDetails', {bookId: book.id})}>
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
