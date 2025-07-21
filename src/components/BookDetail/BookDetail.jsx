import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useTheme } from '@mui/material/styles';

const BookDetail = ({ open, onClose, book }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  if (!book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: 'bg-orange-50', 
        style: { borderRadius: 20, boxShadow: '0 8px 32px 0 rgba(251,146,60,0.2)' },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          fontWeight: 700,
          fontSize: isSmall ? 18 : 22, 
          color: 'black', 
          textAlign: isSmall ? 'center' : 'left',
          letterSpacing: 1,
          background: 'linear-gradient(to right, #ffedd5, #fdba74)',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {book.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: '#fb923c',
            background: '#fff7ed',
            '&:hover': {
              background: '#fdba74',
              color: '#fff',
            },
            boxShadow: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          background: 'rgba(255,237,213,0.5)', 
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          p: isSmall ? 2 : 4,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4} className="flex justify-center">
            {coverUrl ? (
              <Box
                component="img"
                src={coverUrl}
                alt={`Capa do livro ${book.title}`}
                sx={{
                  width: isSmall ? 180 : 220,
                  height: isSmall ? 260 : 320,
                  objectFit: 'cover',
                  borderRadius: 6,
                  boxShadow: '0 4px 24px 0 rgba(251,146,60,0.18)',
                  background: '#fff7ed',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: isSmall ? 180 : 220,
                  height: isSmall ? 260 : 320,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff7ed',
                  borderRadius: 6,
                  boxShadow: '0 4px 24px 0 rgba(251,146,60,0.10)',
                }}
              >
                <MenuBookIcon sx={{ fontSize: 64, color: '#fb923c' }} />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <PersonIcon sx={{ color: '#fb923c' }} />
                <Typography variant="body1" fontWeight={500}>
                  <span className="font-semibold">Autores:</span> {book.author_name}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <CalendarMonthIcon sx={{ color: '#fb923c' }} />
                <Typography variant="body1" fontWeight={500}>
                  <span className="font-semibold">Ano de Publicação:</span> {book.first_publish_year || 'N/A'}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <LocalLibraryIcon sx={{ color: '#fb923c' }} />
                <Typography variant="body1" fontWeight={500}>
                  <span className="font-semibold">Editora:</span> {book.publisher?.join(', ') || 'N/A'}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <MenuBookIcon sx={{ color: '#fb923c' }} />
                <Typography variant="body1" fontWeight={500}>
                  <span className="font-semibold">Nº de Páginas:</span> {book.number_of_pages_median || 'N/A'}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetail;