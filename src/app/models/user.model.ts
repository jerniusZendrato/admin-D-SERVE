export interface UnitType {
  id: string;
  name: string;
  description: string | null;
  roleUnitType: string;
}

export interface Unit {
  id: string;
  name: string;
  status: string;
  unitType: UnitType;
}

export interface User {
  id: string;
  username: string;
  role: string;
  unit: Unit | null;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  role: string;
  unitId?: string;
}

export interface UpdateUserRequest {
  username?: string;
  password?: string;
  role?: string;
  unitId?: string;
}

export interface ApiResponse {
  errors: any;
  data: {
    users: User[];
  };
  timestamp: string;
  isSuccess: boolean;
}