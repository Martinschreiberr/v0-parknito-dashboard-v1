// User types
export type UserRole = "admin" | "manager" | "user"
export type UserStatus = "active" | "inactive" | "pending"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  company_id: string
  avatar_url: string
  created_at: string
  last_login: string | null
}

// Company types
export type CompanyStatus = "active" | "inactive" | "pending"

export interface Company {
  id: string
  name: string
  logo_url: string
  status: CompanyStatus
  locations_count: number
  users_count: number
  created_at: string
  contact_email: string
  contact_phone: string
  address: string
}

// Location types
export type LocationStatus = "active" | "inactive" | "full" | "maintenance"

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Location {
  id: string
  name: string
  company_id: string
  address: string
  total_spots: number
  available_spots: number
  status: LocationStatus
  image_url: string
  created_at: string
  coordinates: Coordinates
}

// Spot types
export type SpotType = "standard" | "compact" | "handicap" | "electric" | "motorcycle"
export type SpotStatus = "available" | "occupied" | "reserved" | "maintenance"
export type SpotFeature = "camera" | "lighting" | "charging_station" | "wide_access" | "covered"

export interface Spot {
  id: string
  location_id: string
  name: string
  type: SpotType
  status: SpotStatus
  floor: number
  features: SpotFeature[]
}

// Reservation types
export type ReservationStatus = "active" | "upcoming" | "completed" | "cancelled"

export interface Vehicle {
  plate: string
  make: string
  model: string
  color: string
}

export interface Reservation {
  id: string
  user_id: string
  location_id: string
  spot_id: string
  start_time: string
  end_time: string
  status: ReservationStatus
  vehicle: Vehicle
  created_at: string
}

// Filter and pagination types
export interface PaginationParams {
  page: number
  limit: number
}

export interface FilterParams {
  search?: string
  status?: string
  company_id?: string
  location_id?: string
  start_date?: string
  end_date?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}
