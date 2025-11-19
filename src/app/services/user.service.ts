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

  changePassword(id: number, oldPassword: string, newPassword: string) {
  return this.http.put(`${this.apiUrl}/${id}/change-password`, {
    oldPassword,
    newPassword
  });
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

  getActive() {
  return this.http.get<User[]>(`${this.apiUrl}`);
}

getDeleted() {
  return this.http.get<User[]>(`${this.apiUrl}/deleted`);
}

restore(id: number) {
  return this.http.post(`${this.apiUrl}/${id}/restore`, {});
}

exportExcel(type: 'active' | 'deleted') {
  return this.http.get(`${this.apiUrl}/export?type=${type}`, { responseType: 'blob' });
}
}
