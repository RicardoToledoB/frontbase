import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/v1/users'; 

  constructor(private http: HttpClient) {}

  // GET all
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // GET by email
  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }

  // GET by id
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // POST (crear)
  create(User: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, User);
  }

  // PUT (actualizar)
  update(id: number, User: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, User);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
