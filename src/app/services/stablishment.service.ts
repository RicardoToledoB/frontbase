import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stablishment } from '../models/Stablishment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StablishmentService {

  private apiUrl = 'http://localhost:8080/api/v1/stablishments'; 
  
    constructor(private http: HttpClient) {}
  
    // GET all
    getAll(): Observable<Stablishment[]> {
      return this.http.get<Stablishment[]>(`${this.apiUrl}/all`);
    }
  
   
  
    // GET by id
    getById(id: number): Observable<Stablishment> {
      return this.http.get<Stablishment>(`${this.apiUrl}/${id}`);
    }
  
    // POST (crear)
    create(Stablishment: Stablishment): Observable<Stablishment> {
      return this.http.post<Stablishment>(this.apiUrl, Stablishment);
    }
  
    // PUT (actualizar)
    update(id: number, Stablishment: Stablishment): Observable<Stablishment> {
      return this.http.put<Stablishment>(`${this.apiUrl}/${id}`, Stablishment);
    }
  
    // DELETE
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    getActive() {
    return this.http.get<Stablishment[]>(`${this.apiUrl}`);
  }
  
  getDeleted() {
    return this.http.get<Stablishment[]>(`${this.apiUrl}/deleted`);
  }
  
  restore(id: number) {
    return this.http.post(`${this.apiUrl}/${id}/restore`, {});
  }
  
  exportExcel(type: 'active' | 'deleted') {
    return this.http.get(`${this.apiUrl}/export?type=${type}`, { responseType: 'blob' });
  }
}
