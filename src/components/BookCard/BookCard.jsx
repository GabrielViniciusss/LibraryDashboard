import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, CardActionArea, IconButton } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BookCard = ({ book, onClick, isFavorite, onToggleFavorite }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    onToggleFavorite();
  };

  return (
    <div
      className="
        rounded-xl shadow-md transition-transform duration-200 
        hover:scale-105 hover:shadow-lg bg-white
        border border-orange-100
        h-full w-full flex flex-col relative
      "
      style={{ minHeight: 370 }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ height: '100%', borderRadius: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            boxShadow: 'none',
            borderRadius: 'inherit',
            background: 'transparent',
          }}
        >
          {coverUrl ? (
            <CardMedia
              component="img"
              sx={{ height: 180, objectFit: 'cover', borderRadius: '0.75rem 0.75rem 0 0' }}
              image={coverUrl}
              alt={`Capa do livro ${book.title}`}
            />
          ) : (
            <Box
              sx={{
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.200',
                borderRadius: '0.75rem 0.75rem 0 0',
              }}
            >
              <BookIcon sx={{ fontSize: 64, color: 'grey.500' }} />
            </Box>
          )}

          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, position: 'relative' }}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{
                whiteSpace: 'pre-wrap',
                fontWeight: 600,
                fontSize: 16,
                mb: 1,
              }}
            >
              {book.title}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', mb: 1 }} >
              {book.author_name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ano: {book.first_publish_year}
            </Typography>

            <IconButton
              aria-label="adicionar aos favoritos"
              onClick={handleFavoriteClick}
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                color: isFavorite ? '#f97316' : '#fdba74', 
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
};

BookCard.defaultProps = {
  book: {
    cover_i: null,
    title: 'Título Indisponível',
    author_name: 'Autor Desconhecido',
    first_publish_year: 'N/A',
  },
  isFavorite: false,
  onToggleFavorite: () => {},
  onClick: () => {},
};

export default BookCard;