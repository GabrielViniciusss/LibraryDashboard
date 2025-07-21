import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataVisualizationPage = ({ books }) => {
  const processDataByDecade = () => {
    const decades = {};
    books.forEach(book => {
      if (book.first_publish_year) {
        const decade = Math.floor(book.first_publish_year / 10) * 10;
        decades[decade] = (decades[decade] || 0) + 1;
      }
    });
    const sortedDecades = Object.keys(decades).sort();
    return {
      labels: sortedDecades.map(d => `${d}s`),
      datasets: [{
        label: 'Nº de Livros por Década',
        data: sortedDecades.map(d => decades[d]),
        backgroundColor: 'rgba(251, 146, 60, 0.6)',
        borderColor: 'rgba(251, 146, 60, 1)',
        borderWidth: 1,
      }],
    };
  };

  const processTopAuthors = () => {
    const authorCount = {};
    books.forEach(book => {
      const authors = book.author_name.split(', ');
      authors.forEach(author => {
        if (author && author !== 'Autor Desconhecido') {
          authorCount[author] = (authorCount[author] || 0) + 1;
        }
      });
    });
    const sortedAuthors = Object.entries(authorCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    return {
      labels: sortedAuthors.map(([name]) => name),
      datasets: [{
        label: 'Top 10 Autores',
        data: sortedAuthors.map(([, count]) => count),
        backgroundColor: 'rgba(251, 146, 60, 0.6)',
        borderColor: 'rgba(251, 146, 60, 1)',
        borderWidth: 1,
      }],
    };
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <BarChartIcon sx={{ fontSize: 36, color: '#fb923c' }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Análise da Página
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
        Estes gráficos representam uma análise dos {books.length} livros visíveis na página atual do dashboard.
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        Distribuição de Livros por Década
      </Typography>
      <Bar data={processDataByDecade()} />

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        Top 10 Autores Mais Encontrados
      </Typography>
      <Bar data={processTopAuthors()} />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderColor: '#fb923c',
            color: '#fb923c',
            '&:hover': {
              borderColor: '#f97316',
              backgroundColor: 'rgba(251, 146, 60, 0.04)',
            },
          }}
        >
          Voltar ao Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default DataVisualizationPage;