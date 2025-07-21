import React from 'react';
import BookCard from './BookCard';
import { Box } from '@mui/material';

// Configuração principal do Storybook para este componente
export default {
  title: 'Components/BookCard',
  component: BookCard,
  decorators: [(Story) => <Box sx={{ maxWidth: 345 }}><Story /></Box>],
};

// Mock de um livro com todas as informações
const mockBookWithCover = {
  title: 'O Hobbit\numa Aventura Inesperada',
  author_name: 'J. R. R. Tolkien',
  first_publish_year: 1937,
  cover_i: 837832, // ID de uma capa real
};

// Mock de um livro sem capa
const mockBookWithoutCover = {
  title: 'Livro Sem Capa Disponível',
  author_name: 'Autor Desconhecido',
  first_publish_year: 2025,
  cover_i: null,
};

const Template = (args) => <BookCard {...args} />;

// História 1: O estado padrão do card com capa
export const Default = Template.bind({});
Default.args = {
  book: mockBookWithCover,
  onClick: () => alert('Card clicado!'),
};

// História 2: O estado do card sem imagem de capa
export const WithoutCover = Template.bind({});
WithoutCover.args = {
  book: mockBookWithoutCover,
  onClick: () => alert('Card clicado!'),
};