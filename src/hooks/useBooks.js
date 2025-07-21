import { useState, useCallback } from 'react';
import { fetchBooks as fetchBooksAPI } from '../services/openLibraryAPI';

const BOOKS_PER_PAGE = 20;

// Função para formatar textos (para os cards terem o mesmo tamanho e continuarem responsivos)
const formatTextWithLineBreaks = (text) => {
  const maxLineLength = 25; 
  if (text.length <= maxLineLength) {
    return text;
  }

  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).length > maxLineLength && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine.length === 0 ? '' : ' ') + word;
    }
  }
  lines.push(currentLine);

  return lines.join('\n');
};

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
  });

  const searchBooks = useCallback(async (query, page = 1, lang, sort) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooksAPI(query, page, BOOKS_PER_PAGE, lang, sort);
      
      const formattedBooks = data.docs.map(book => {
        const authorsString = book.author_name?.join(', ') || 'Autor Desconhecido';
        return {
          ...book,
          title: formatTextWithLineBreaks(book.title),
          author_name: formatTextWithLineBreaks(authorsString),
        };
      });

      setBooks(formattedBooks || []);
      
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(data.num_found / BOOKS_PER_PAGE),
        totalResults: data.num_found,
      });

    } catch (err) {
      setError('Não foi possível buscar os livros. Tente novamente mais tarde.');
      console.log(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, pagination, searchBooks };
};