import { useEffect } from 'react';
import { useBooks } from './hooks/useBooks';
import BookCard from './components/BookCard/BookCard';
import Loading from './components/Loading/Loading';
import { Container, Typography, Grid } from '@mui/material'; 

function App() {
  const { books, loading, error, searchBooks } = useBooks();
  
  useEffect(() => {
    searchBooks(''); 
  }, [searchBooks]);

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
    
    // Grid de livros
    return (
      <Grid container spacing={4} mt={2} justifyContent="center">
        {books.map((book) => (
          // 4 cards por linha em telas médias e grandes
          <Grid item key={book.key} xs={12} sm={6} md={3} lg={3} sx={{ display: 'flex' }}>
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
      
      {/* Aqui virá a barra de busca */}

      {renderContent()}

      {/* Aqui virá a paginação */}
    </Container>
  );
}

export default App;