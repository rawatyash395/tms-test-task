export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'employee';
  created_at: Date;
}

export interface Shipment {
  id: number;
  shipper_name: string;
  shipper_email?: string;
  shipper_phone?: string;
  carrier_name: string;
  carrier_contact?: string;
  pickup_location: string;
  pickup_date: Date;
  delivery_location: string;
  delivery_date?: Date;
  estimated_delivery?: Date;
  tracking_number?: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled' | 'delayed';
  weight_kg?: number;
  dimensions?: string;
  cargo_type?: string;
  rate_amount: number;
  currency: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Context {
  user?: {
    id: number;
    email: string;
    role: 'admin' | 'employee';
  };
  loaders: {
    shipment: import('dataloader')<number, Shipment>;
    user: import('dataloader')<number, User>;
  };
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface SortInput {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface ShipmentFilterInput {
  status?: string;
  carrier_name?: string;
  priority?: string;
  is_flagged?: boolean;
  search?: string;
  date_from?: string;
  date_to?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}
