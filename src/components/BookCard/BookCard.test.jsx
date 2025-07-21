/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';

describe('BookCard Component', () => {
  const mockBook = {
    title: 'O Senhor dos Anéis',
    author_name: 'J. R. R. Tolkien', 
    first_publish_year: 1954,
    cover_i: 12345,
  };

  test('renders book information correctly', () => {
    render(<BookCard book={mockBook} onClick={() => {}} />);

    expect(screen.getByText('O Senhor dos Anéis')).toBeInTheDocument();
    expect(screen.getByText('J. R. R. Tolkien')).toBeInTheDocument();
    expect(screen.getByText(/Ano: 1954/i)).toBeInTheDocument();
  });

  test('renders placeholder when no cover is available', () => {
    const bookWithoutCover = { ...mockBook, cover_i: null };
    render(<BookCard book={bookWithoutCover} onClick={() => {}} />);

    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });
});