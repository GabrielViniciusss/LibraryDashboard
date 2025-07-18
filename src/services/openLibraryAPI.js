import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://openlibrary.org',
});

const REQUEST_FIELDS = 'title,author_name,cover_i,first_publish_year,key,number_of_pages_median,publisher';

// Query Parameters
/**
 *
 * @param {string} 
 * @param {number}
 * @param {number}
 * @returns {Promise<object>} - resposta da API.
 */

export const fetchBooks = async (query, page = 1, limit = 25) => {
  try {
    const response = await apiClient.get('/search.json', {
      params: {
        q: query || '*', // Se a busca for vazia, busca por tudo.
        page,
        limit,
        fields: REQUEST_FIELDS,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error: Failed to fetch books', error);
    throw error;
  }
};