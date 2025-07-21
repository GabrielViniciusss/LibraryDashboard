import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
});

const REQUEST_FIELDS = 'title,author_name,cover_i,first_publish_year,key,number_of_pages_median,publisher';

export const fetchBooks = async (query, page = 1, limit = 20, lang, sort) => {
  const maxAttempts = 12;
  const retryDelay = 5000;

  const params = {
    q: query || '*',
    page,
    limit,
    fields: REQUEST_FIELDS,
  };

  if (lang) {
    params.lang = lang;
  }
  if (sort) {
    params.sort = sort;
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await apiClient.get('/search.json', { params });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Erro 400: Requisição inválida. Cancelando tentativas.', error);
        throw new Error('A sua busca gerou uma requisição inválida.');
      }
      console.log(`Tentativa ${attempt} de ${maxAttempts} falhou. Nova tentativa em 5 segundos...`);
      if (attempt === maxAttempts) {
        console.error('API Error: Todas as tentativas de requisição falharam.', error);
        throw new Error('Não foi possível buscar os livros. Tente novamente mais tarde.');
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};