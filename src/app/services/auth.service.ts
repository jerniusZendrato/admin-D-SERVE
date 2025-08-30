import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User } from '../models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://mining-be-service-dev.up.railway.app/api';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          const token = response.data?.accessToken || response.accessToken;
          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem(this.userKey, JSON.stringify(response.data || response.user));
          this.currentUserSubject.next(response.data || response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  private getStoredUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user && user !== 'undefined' ? JSON.parse(user) : null;
  }
}