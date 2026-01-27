import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_API_URL || '/graphql';

export const createGraphQLClient = (token?: string) => {
  return new GraphQLClient(endpoint, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
};

export const graphqlClient = createGraphQLClient();
