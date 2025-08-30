import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit, UnitType, ApiResponse, PaginatedResponse } from '../models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl = 'https://mining-be-service-dev.up.railway.app/api';

  constructor(private http: HttpClient) {}

  // Unit CRUD
  getUnits(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/units`);
  }

  getUnit(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/units/${id}`);
  }

  createUnit(unit: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/units`, unit);
  }

  updateUnit(id: string, unit: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/units/${id}`, unit);
  }

  deleteUnit(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/units/${id}`);
  }

  // UnitType CRUD
  getUnitTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/unit-types`);
  }

  getUnitType(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/unit-types/${id}`);
  }

  createUnitType(unitType: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/unit-types`, unitType);
  }

  updateUnitType(id: string, unitType: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/unit-types/${id}`, unitType);
  }

  deleteUnitType(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/unit-types/${id}`);
  }
}