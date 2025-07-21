import React from 'react';
import { Box, IconButton } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const getPageNumbers = (current, total) => {
  const delta = 2;
  let start = Math.max(1, current - delta);
  let end = Math.min(total, current + delta);

  if (current <= delta) {
    end = Math.min(total, 1 + 2 * delta);
  }
  if (current + delta > total) {
    start = Math.max(1, total - 2 * delta);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <Box
      className="flex justify-center items-center gap-2 mt-8"
    >
      <IconButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="primeira página"
        className="!rounded-full"
        sx={{
          color: currentPage === 1 ? '#fdba74' : '#fb923c',
          backgroundColor: currentPage === 1 ? '#fff7ed' : '#ffedd5',
          '&:hover': { backgroundColor: '#fdba74', color: '#fff' },
        }}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="página anterior"
        className="!rounded-full"
        sx={{
          color: currentPage === 1 ? '#fdba74' : '#fb923c',
          backgroundColor: currentPage === 1 ? '#fff7ed' : '#ffedd5',
          '&:hover': { backgroundColor: '#fdba74', color: '#fff' },
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`
            px-3 py-1 mx-1 rounded-full font-semibold transition
            ${page === currentPage
              ? 'bg-orange-400 text-white shadow'
              : 'bg-orange-100 text-orange-600 hover:bg-orange-300 hover:text-white'}
            ${page === currentPage ? 'cursor-default' : 'cursor-pointer'}
          `}
          style={{ minWidth: 36 }}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="próxima página"
        className="!rounded-full"
        sx={{
          color: currentPage === totalPages ? '#fdba74' : '#fb923c',
          backgroundColor: currentPage === totalPages ? '#fff7ed' : '#ffedd5',
          '&:hover': { backgroundColor: '#fdba74', color: '#fff' },
        }}
      >
        <NavigateNextIcon />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="última página"
        className="!rounded-full"
        sx={{
          color: currentPage === totalPages ? '#fdba74' : '#fb923c',
          backgroundColor: currentPage === totalPages ? '#fff7ed' : '#ffedd5',
          '&:hover': { backgroundColor: '#fdba74', color: '#fff' },
        }}
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;