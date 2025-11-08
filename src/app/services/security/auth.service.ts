import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // tu backend

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token); // guarda el token JWT
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;  // verifica si exp no ha pasado
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  getUserEmailFromToken(): string | null {
  const token = this.getToken();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub || null; // aquí viene el email
  } catch (e) {
    return null;
  }
}
}
