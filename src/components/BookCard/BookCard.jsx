import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

const BookCard = ({ book }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
    : null;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' , width: '100%'}}>
      {coverUrl ? (
        // Se a URL da capa existe, renderiza a imagem
        <CardMedia
          component="img"
          sx={{ height: 280, objectFit: 'contain', pt: 1 }}
          image={coverUrl}
          alt={`Capa do livro ${book.title}`} 
        />
      ) : (
        <Box
          sx={{
            height: 280,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.200',
          }}
        >
          <BookIcon sx={{ fontSize: 80, color: 'grey.500' }} />
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {book.title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} /> 
        
        <Typography variant="body2" color="text.secondary">
          {book.author_name?.join(', ')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Ano: {book.first_publish_year}
        </Typography>
      </CardContent>
    </Card>
  );
};

BookCard.defaultProps = {
  book: {
    cover_i: null,
    title: 'Título Indisponível',
    author_name: ['Autor Desconhecido'],
    first_publish_year: 'N/A',
  },
};

export default BookCard;