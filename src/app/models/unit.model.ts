export interface Unit {
  id?: string;
  name: string;
  unitTypeId: string;
  unitType?: UnitType;
  createdAt?: string;
  updatedAt?: string;
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
  id: number;
  username: string;
  name: string;
}