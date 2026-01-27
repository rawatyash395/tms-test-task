import { authResolvers } from './auth';
import { shipmentResolvers } from './shipment';

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...shipmentResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...shipmentResolvers.Mutation,
  },
  Shipment: {
    ...shipmentResolvers.Shipment,
  },
};
