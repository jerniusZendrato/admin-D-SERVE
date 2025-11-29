import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSupport(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/support`);
    }
  
}
