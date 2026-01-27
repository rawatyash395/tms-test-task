export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  created_at?: string;
}

export interface Shipment {
  id: string;
  shipper_name: string;
  shipper_email?: string;
  shipper_phone?: string;
  carrier_name: string;
  carrier_contact?: string;
  pickup_location: string;
  pickup_date: string;
  delivery_location: string;
  delivery_date?: string;
  estimated_delivery?: string;
  tracking_number?: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled' | 'delayed';
  weight_kg?: number;
  dimensions?: string;
  cargo_type?: string;
  rate_amount: number;
  currency: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  is_flagged: boolean;
  flagged_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface ShipmentsResponse {
  items: Shipment[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ShipmentFilter {
  status?: string;
  carrier_name?: string;
  priority?: string;
  is_flagged?: boolean;
  search?: string;
  date_from?: string;
  date_to?: string;
}

export interface SortConfig {
  field: string;
  order: 'ASC' | 'DESC';
}

export type ViewMode = 'grid' | 'tile';
