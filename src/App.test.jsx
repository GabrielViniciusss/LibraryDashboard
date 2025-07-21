/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { useBooks } from './hooks/useBooks';

// Prepara a simulação (mock) do nosso hook 
jest.mock('./hooks/useBooks');

describe('Testes de Integração do Componente App', () => {
  const mockSearchBooks = jest.fn();

  // Antes de cada teste, reseta o estado do mock
  beforeEach(() => {
    useBooks.mockReturnValue({
      books: [],
      loading: false,
      error: null,
      pagination: { currentPage: 1, totalPages: 1 },
      searchBooks: mockSearchBooks,
    });
    mockSearchBooks.mockClear();
  });

  test('exibe o estado de loading corretamente', () => {
    // Força o hook para o estado de loading
    useBooks.mockReturnValueOnce({
      loading: true,
      error: null,
      books: [],
      pagination: {},
      searchBooks: mockSearchBooks,
    });
    
    render(<App />);
    
    // Verifica se encontra pelo menos um skeleton
    expect(screen.getAllByTestId('book-card-skeleton').length).toBeGreaterThan(0);
  });

  test('exibe o estado de erro corretamente', () => {
    useBooks.mockReturnValueOnce({
      loading: false,
      error: 'Falha ao buscar livros',
      books: [],
      pagination: {},
      searchBooks: mockSearchBooks,
    });

    render(<App />);

    // Verifica se a mensagem de erro aparece
    expect(screen.getByText('Falha ao buscar livros')).toBeInTheDocument();
  });

  test('chama a função de busca com a query correta ao digitar no campo de busca', async () => {
    render(<App />);
    const searchInput = screen.getByLabelText(/Buscar por título ou autor/i);

    // Act: Simula o usuário digitando no campo
    await userEvent.type(searchInput, 'Duna');

    await waitFor(() => {
      // A query correta é apenas 'Duna'
      expect(mockSearchBooks).toHaveBeenCalledWith('Duna', 1);
    }, { timeout: 600 });
  });
});