import { createClient, cacheExchange, fetchExchange } from 'urql';

export const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [cacheExchange, fetchExchange],
});
