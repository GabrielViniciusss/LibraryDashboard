import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BookDetail = ({ open, onClose, book }) => {
  if (!book) {
    return null;
  }

  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {book.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {coverUrl ? (
              <Box
                component="img"
                sx={{ width: '100%', objectFit: 'contain' }}
                src={coverUrl}
                alt={`Capa do livro ${book.title}`}
              />
            ) : (
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.200' }}>
                <Typography>Capa indisponível</Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography gutterBottom><strong>Autores:</strong> {book.author_name}</Typography>
            <Typography gutterBottom><strong>Ano de Publicação:</strong> {book.first_publish_year || 'N/A'}</Typography>
            <Typography gutterBottom><strong>Editora:</strong> {book.publisher?.join(', ') || 'N/A'}</Typography>
            <Typography gutterBottom><strong>Nº de Páginas:</strong> {book.number_of_pages_median || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetail;