
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://mysterious-bear-cloak.cyclic.app/', 
  cache: new InMemoryCache()
});

export default client;
