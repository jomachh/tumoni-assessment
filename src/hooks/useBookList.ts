import {useCallback, useEffect, useState} from 'react';
import {getBookList} from '../services/book';
import {isApiError} from '../utils/isApiError';

export const useBookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBookList();

      if (isApiError(data)) {
        setError(data);
        return;
      }

      setBooks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  return {books, loading, error, fetchBooks};
};
