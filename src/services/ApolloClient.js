import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://example.com/graphql', // Remplacez cette URL par l'URL de votre serveur GraphQL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
