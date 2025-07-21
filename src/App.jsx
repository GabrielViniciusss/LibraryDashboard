import { useEffect, useState } from 'react';
import { useBooks } from './hooks/useBooks';
import useDebounce from './hooks/useDebounce';
import BookCard from './components/BookCard/BookCard';
import Loading from './components/Loading/Loading';
import SearchBar from './components/SearchBar/SearchBar';
import Pagination from './components/Pagination/Pagination';
import { Container, Typography, AppBar, Toolbar,Box } from '@mui/material'; 
import BookDetail from './components/BookDetail/BookDetail';
import BookIcon from '@mui/icons-material/Book';
import './index.css'; 
import Footer from './components/Footer/Footer';

function App() {
  const { books, loading, error, pagination, searchBooks } = useBooks();
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  
  const [query, setQuery] = useState('*');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const newQuery = debouncedSearchTerm.trim() || '*';
    let yearFilter = '';

    if (startYear && endYear) {
      yearFilter = ` AND first_publish_year:[${startYear} TO ${endYear}]`;
    } else if (startYear) {
      yearFilter = ` AND first_publish_year:[${startYear} TO *]`;
    } else if (endYear) {
      yearFilter = ` AND first_publish_year:[* TO ${endYear}]`;
    }

    setQuery(newQuery + yearFilter);
    setCurrentPage(1); 
  }, [debouncedSearchTerm, startYear, endYear]);

  useEffect(() => {
    searchBooks(query, currentPage);
  }, [query, currentPage, searchBooks]);


  const handleOpenBookModal = (book) => {
    setSelectedBook(book);
  };

  const handleCloseBookModal = () => {
    setSelectedBook(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 items-stretch">
        {books.map((book) => (
          <BookCard key={book.key} book={book} onClick={() => handleOpenBookModal(book)} />
        ))}
      </div>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(to right, #ffedd5, #fdba74)', 
          boxShadow: 3,
        }}
      >
        <Toolbar>
          <BookIcon sx={{ mr: 2, color: 'black' }} /> 
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Roboto Slab, serif', color: 'black' }} 
          >
            Dashboard de Livros
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Conteudo Principal */}
      <Container sx={{ py: 4 }}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          startYear={startYear}
          setStartYear={setStartYear}
          endYear={endYear}
          setEndYear={setEndYear}
        />

        {renderContent()}
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />

        <BookDetail 
          open={!!selectedBook} 
          onClose={handleCloseBookModal} 
          book={selectedBook} 
        />
      </Container>
    <Footer />
  </Box>
  );
}

export default App;