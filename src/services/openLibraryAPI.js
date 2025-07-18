import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
});

const REQUEST_FIELDS = 'title,author_name,cover_i,first_publish_year,key,number_of_pages_median,publisher';

export const fetchBooks = async (query, page = 1, limit = 25) => {
  const maxAttempts = 12; // 12 tentativas x 5 segundos = 60 segundos
  const retryDelay = 5000; // 5 segundos em milissegundos

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await apiClient.get('/search.json', {
        params: {
          q: query || '*',
          page,
          limit,
          fields: REQUEST_FIELDS,
        },
      });
      return response.data; 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Erro 400: Requisição inválida. Cancelando tentativas.', error);
        throw new Error('A sua busca gerou uma requisição inválida.');
      }

      console.log(`Tentativa ${attempt} de ${maxAttempts} falhou. Nova tentativa em 5 segundos...`);

      // Se esta for a última tentativa, lança o erro final
      if (attempt === maxAttempts) {
        console.error('API Error: Todas as tentativas de requisição falharam.', error);
        throw new Error('Não foi possível buscar os livros. Tente novamente mais tarde.');
      }

      // Espera 5 segundos antes da próxima iteração do loop
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};