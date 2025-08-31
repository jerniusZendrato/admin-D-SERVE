export interface Unit {
  id?: string;
  name: string;
  unitTypeId: string;
  unitType?: UnitType;
  createdAt?: string;
  updatedAt?: string;
}

export interface UnitResponse {
  id: string;
  name: string;
  status: 'AVAILABLE' | 'BUSY' | 'MAINTENANCE';
  unitType: UnitType;
}

export interface UnitType {
  id?: string;
  name: string;
  description?: string;
  roleUnitType: 'HELPER' | 'REQUESTER';
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    user: User;
  };
  message: string;
  isSuccess: boolean;
}

export interface User {
  id: string;
  username: string;
  role: string;
  unit: UnitResponse | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface CreateUnitRequest {
  name: string;
  unitTypeId: string;
}