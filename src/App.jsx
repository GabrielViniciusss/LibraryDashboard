import { useEffect, useState } from 'react';
import { useBooks } from './hooks/useBooks';
import useDebounce from './hooks/useDebounce';
import { Routes, Route, Link } from 'react-router-dom';

import { Container, Typography, AppBar, Toolbar, Box, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import Footer from './components/Footer/Footer';
import BookDetail from './components/BookDetail/BookDetail';

import HomePage from './pages/HomePage/HomePage';
import DataVisualizationPage from './pages/DataVisualization/DataVisualization';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import './index.css';

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

  const handleOpenBookModal = (book) => setSelectedBook(book);
  const handleCloseBookModal = () => setSelectedBook(null);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <AppBar
        position="sticky"
        sx={{
          background: '#fff', 
          boxShadow: 3,
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#fb923c',
              mr: 2,
              '&:hover': { opacity: 0.8 },
            }}
          >
            <BookIcon sx={{ mr: 1, color: '#fb923c' }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Roboto Slab, serif',
                color: '#fb923c',
                fontWeight: 700,
              }}
            >
              V-library
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ py: 4, flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                books={books}
                loading={loading}
                error={error}
                pagination={pagination}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                startYear={startYear}
                setStartYear={setStartYear}
                endYear={endYear}
                setEndYear={setEndYear}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                handleOpenBookModal={handleOpenBookModal}
              />
            }
          />
          <Route
            path="/visualizacao"
            element={<DataVisualizationPage books={books} />}
          />
        </Routes>
      </Container>

      <Footer />

      <BookDetail
        open={!!selectedBook}
        onClose={handleCloseBookModal}
        book={selectedBook}
      />
    </Box>
  );
}
export default App;