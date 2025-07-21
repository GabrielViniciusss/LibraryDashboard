import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        mt: 4,
        color: 'text.primary'
      }}
    >
      <IconButton onClick={() => onPageChange(1)} disabled={currentPage === 1} aria-label="primeira página">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="página anterior">
        <NavigateBeforeIcon />
      </IconButton>

      <Typography>
        Página {currentPage} de {totalPages}
      </Typography>

      <IconButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="próxima página">
        <NavigateNextIcon />
      </IconButton>
      <IconButton onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} aria-label="última página">
        <LastPageIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;