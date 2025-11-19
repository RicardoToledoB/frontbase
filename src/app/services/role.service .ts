import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://localhost:8080/api/v1/roles'; 
  
    constructor(private http: HttpClient) {}
  
    // GET all
    getAll(): Observable<Role[]> {
      return this.http.get<Role[]>(`${this.apiUrl}/all`);
    }
  
   
  
    // GET by id
    getById(id: number): Observable<Role> {
      return this.http.get<Role>(`${this.apiUrl}/${id}`);
    }
  
    // POST (crear)
    create(Role: Role): Observable<Role> {
      return this.http.post<Role>(this.apiUrl, Role);
    }
  
    // PUT (actualizar)
    update(id: number, Role: Role): Observable<Role> {
      return this.http.put<Role>(`${this.apiUrl}/${id}`, Role);
    }
  
    // DELETE
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    getActive() {
    return this.http.get<Role[]>(`${this.apiUrl}`);
  }
  
  getDeleted() {
    return this.http.get<Role[]>(`${this.apiUrl}/deleted`);
  }
  
  restore(id: number) {
    return this.http.post(`${this.apiUrl}/${id}/restore`, {});
  }
  
  exportExcel(type: 'active' | 'deleted') {
    return this.http.get(`${this.apiUrl}/export?type=${type}`, { responseType: 'blob' });
  }
}
