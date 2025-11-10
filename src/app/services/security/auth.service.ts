import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL backend

  constructor(private http: HttpClient, private router: Router) { }

  // 🔹 Login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token); // guarda el JWT
      })
    );
  }

  // 🔹 Logout
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // 🔹 Obtener token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Verificar autenticación
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  }

  // 🔹 Decodificar token (payload)
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  // 🔹 Obtener email desde el token
  getUserEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.email || decoded.sub || null;
    } catch {
      return null;
    }
  }

  // 🔹 Obtener ID de usuario desde el token (nuevo)
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.id || null;
    } catch {
      return null;
    }
  }

  // 🔹 Obtener nombre completo desde el token (opcional)
  getUserFullNameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.name || null;
    } catch {
      return null;
    }
  }
}
