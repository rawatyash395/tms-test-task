import { gql } from 'graphql-request';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      role
      created_at
    }
  }
`;

export const SHIPMENTS_QUERY = gql`
  query Shipments(
    $filter: ShipmentFilterInput
    $page: Int
    $limit: Int
    $sort: SortInput
  ) {
    shipments(filter: $filter, page: $page, limit: $limit, sort: $sort) {
      items {
        id
        shipper_name
        shipper_email
        shipper_phone
        carrier_name
        carrier_contact
        pickup_location
        pickup_date
        delivery_location
        delivery_date
        estimated_delivery
        tracking_number
        status
        weight_kg
        dimensions
        cargo_type
        rate_amount
        currency
        priority
        notes
        created_at
        updated_at
      }
      totalCount
      page
      limit
      totalPages
    }
  }
`;

export const SHIPMENT_QUERY = gql`
  query Shipment($id: ID!) {
    shipment(id: $id) {
      id
      shipper_name
      shipper_email
      shipper_phone
      carrier_name
      carrier_contact
      pickup_location
      pickup_date
      delivery_location
      delivery_date
      estimated_delivery
      tracking_number
      status
      weight_kg
      dimensions
      cargo_type
      rate_amount
      currency
      priority
      notes
      created_at
      updated_at
    }
  }
`;

export const CREATE_SHIPMENT_MUTATION = gql`
  mutation CreateShipment($input: CreateShipmentInput!) {
    createShipment(input: $input) {
      id
      shipper_name
      tracking_number
      status
    }
  }
`;

export const UPDATE_SHIPMENT_MUTATION = gql`
  mutation UpdateShipment($id: ID!, $input: UpdateShipmentInput!) {
    updateShipment(id: $id, input: $input) {
      id
      shipper_name
      tracking_number
      status
    }
  }
`;

export const DELETE_SHIPMENT_MUTATION = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id)
  }
`;

export const FLAG_SHIPMENT_MUTATION = gql`
  mutation FlagShipment($id: ID!, $reason: String) {
    flagShipment(id: $id, reason: $reason) {
      id
      is_flagged
      flagged_reason
    }
  }
`;

export const UNFLAG_SHIPMENT_MUTATION = gql`
  mutation UnflagShipment($id: ID!) {
    unflagShipment(id: $id) {
      id
      is_flagged
      flagged_reason
    }
  }
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      name
      role
      created_at
    }
  }
`;

export const SYSTEM_STATS_QUERY = gql`
  query SystemStats {
    systemStats {
      totalShipments
      pendingShipments
      inTransitShipments
      deliveredShipments
      totalUsers
    }
  }
`;
