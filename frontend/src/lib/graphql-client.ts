import { GraphQLClient } from 'graphql-request';

const endpoint = '/graphql';

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
