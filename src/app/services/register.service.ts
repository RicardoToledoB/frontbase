import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

 private apiUrl = 'http://localhost:8080/api/v1/registers'; 

  constructor(private http: HttpClient) {}

  // GET all
  getAll(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.apiUrl}/all`);
  }

  // GET by id
  getById(id: number): Observable<Register> {
    return this.http.get<Register>(`${this.apiUrl}/${id}`);
  }

  // POST (crear)
  create(Register: Register): Observable<Register> {
    return this.http.post<Register>(this.apiUrl, Register);
  }

  // PUT (actualizar)
  update(id: number, Register: Register): Observable<Register> {
    return this.http.put<Register>(`${this.apiUrl}/${id}`, Register);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
