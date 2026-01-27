import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    role: Role!
    created_at: String!
  }

  enum Role {
    admin
    employee
  }

  type Shipment {
    id: ID!
    shipper_name: String!
    shipper_email: String
    shipper_phone: String
    carrier_name: String!
    carrier_contact: String
    pickup_location: String!
    pickup_date: String!
    delivery_location: String!
    delivery_date: String
    estimated_delivery: String
    tracking_number: String
    status: ShipmentStatus!
    weight_kg: Float
    dimensions: String
    cargo_type: String
    rate_amount: Float!
    currency: String!
    priority: Priority!
    notes: String
    created_by: User
    created_at: String!
    updated_at: String!
  }

  enum ShipmentStatus {
    pending
    in_transit
    delivered
    cancelled
    delayed
  }

  enum Priority {
    low
    normal
    high
    urgent
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type ShipmentsResponse {
    items: [Shipment!]!
    totalCount: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  input ShipmentFilterInput {
    status: String
    carrier_name: String
    priority: String
    search: String
    date_from: String
    date_to: String
  }

  input SortInput {
    field: String!
    order: String!
  }

  input CreateShipmentInput {
    shipper_name: String!
    shipper_email: String
    shipper_phone: String
    carrier_name: String!
    carrier_contact: String
    pickup_location: String!
    pickup_date: String!
    delivery_location: String!
    estimated_delivery: String
    tracking_number: String
    status: String
    weight_kg: Float
    dimensions: String
    cargo_type: String
    rate_amount: Float!
    currency: String
    priority: String
    notes: String
  }

  input UpdateShipmentInput {
    shipper_name: String
    shipper_email: String
    shipper_phone: String
    carrier_name: String
    carrier_contact: String
    pickup_location: String
    pickup_date: String
    delivery_location: String
    delivery_date: String
    estimated_delivery: String
    tracking_number: String
    status: String
    weight_kg: Float
    dimensions: String
    cargo_type: String
    rate_amount: Float
    currency: String
    priority: String
    notes: String
  }

  type Query {
    me: User!
    
    shipments(
      filter: ShipmentFilterInput
      page: Int
      limit: Int
      sort: SortInput
    ): ShipmentsResponse!
    
    shipment(id: ID!): Shipment!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    
    createShipment(input: CreateShipmentInput!): Shipment!
    updateShipment(id: ID!, input: UpdateShipmentInput!): Shipment!
  }
`;
