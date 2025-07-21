import { useEffect, useState } from 'react';
import { useBooks } from './hooks/useBooks';
import useDebounce from './hooks/useDebounce';
import BookCard from './components/BookCard/BookCard';
import Loading from './components/Loading/Loading';
import SearchBar from './components/SearchBar/SearchBar';
import { Container, Typography, Grid } from '@mui/material'; 

function App() {
  const { books, loading, error, searchBooks } = useBooks();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    let query = debouncedSearchTerm.trim() || '*';
    
    if (startYear && endYear) {
      query += ` AND first_publish_year:[${startYear} TO ${endYear}]`;
    } else if (startYear) {
      query += ` AND first_publish_year:[${startYear} TO *]`;
    } else if (endYear) {
      query += ` AND first_publish_year:[* TO ${endYear}]`;
    }
    
    searchBooks(query);
  }, [debouncedSearchTerm, startYear, endYear, searchBooks]);

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    
    if (error) {
      return <Typography color="error" align="center" mt={5}>{error}</Typography>;
    }
    
    if (books.length === 0 && !loading) {
      return <Typography align="center" mt={5}>Nenhum livro encontrado.</Typography>;
    }
    
    return (
      <Grid container spacing={4} mt={2} justifyContent="center">
        {books.map((book) => (
          <Grid item key={book.key} xs={12} sm={6} md={3} lg={3}>
              <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom color="primary">
        Dashboard de Livros
      </Typography>
      
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
      />

      {renderContent()}

      {/* Aqui virá a paginação */}
    </Container>
  );
}

export default App;