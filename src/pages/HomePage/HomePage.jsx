import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../../components/BookCard/BookCard';
import Loading from '../../components/Loading/Loading';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';
import { Typography, Box, Button } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

const HomePage = ({
  books,
  loading,
  error,
  pagination,
  searchTerm,
  setSearchTerm,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  currentPage,
  handlePageChange,
  handleOpenBookModal,
  favorites,
  handleToggleFavorite,
  language,
  setLanguage,
  sortBy,
  setSortBy,
}) => {
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
        {books.map((book) => {
          const isFavorite = favorites.some(favBook => favBook.key === book.key);
          return (
            <BookCard
              key={book.key}
              book={book}
              isFavorite={isFavorite}
              onToggleFavorite={() => handleToggleFavorite(book)}
              onClick={() => handleOpenBookModal(book)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        language={language}
        setLanguage={setLanguage}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      {books.length > 0 && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
          <Button
            component={Link}
            to="/visualizacao"
            variant="contained"
            startIcon={<BarChartIcon />}
            sx={{
              backgroundColor: '#fb923c', 
              '&:hover': {
                backgroundColor: '#f97316', 
              },
            }}
          >
            Ver Dados da Página Atual
          </Button>
        </Box>
      )}

      {renderContent()}
      
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default HomePage;