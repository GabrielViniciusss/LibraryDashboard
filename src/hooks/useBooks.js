import { useState, useCallback } from 'react';
import { fetchBooks as fetchBooksAPI } from '../services/openLibraryAPI';

const BOOKS_PER_PAGE = 25;

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
  });

  const searchBooks = useCallback(async (query, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooksAPI(query, page, BOOKS_PER_PAGE);
      setBooks(data.docs || []);
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