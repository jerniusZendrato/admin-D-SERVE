import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoctionService {

  
    private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authDataService: AuthService,
  ) { }


  getLocations(): Observable<any> {
       return new Observable((observer) => {
      (async () => {
        const authData = await this.authDataService.getToken();

         if (!authData ) {
          observer.error('Token tidak ditemukan');
          return;
        }

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authData}`
        });

        this.http.get<any[]>(this.baseUrl + '/locations', { headers }).subscribe({
          next: (res) => observer.next(res),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      })();
    });
  }




  createLocation(payload: any): Observable<any> {
    return new Observable((observer) => {
      (async () => {
        try {
          // Ambil token dari AuthDataService
          const token = await this.authDataService.getToken();

          if (!token) {
            observer.error("Token tidak ditemukan");
            return;
          }

          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          });

          this.http.post<any>(this.baseUrl + '/locations', payload, { headers }).subscribe({
            next: (res) => observer.next(res),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
          });

        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }

  updateLocation(id: string, dataname: string): Observable<any> {
    return new Observable((observer) => {
      (async () => {
        try {
          // Ambil token
          const token = await this.authDataService.getToken();

          const payload = {
            name: dataname  // hanya ambil field 'name'
          };
        

          if (!token) {
            observer.error("Token tidak ditemukan");
            return;
          }

          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          });

          // Panggil API PUT
          this.http.put(`${this.baseUrl}/locations/${id}`, payload, { headers }).subscribe({
            next: (res) => observer.next(res),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
          });

        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }



  deleteLocation(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/locations/${id}`);
}


    
}
