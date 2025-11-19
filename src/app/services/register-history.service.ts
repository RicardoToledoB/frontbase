import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterHistory } from '../models/RegisterHistory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterHistoryService {

   private baseUrl = 'http://localhost:8080/api/v1/registers_histories';

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener historial de un Register por ID */
  getByRegister(registerId: number): Observable<RegisterHistory[]> {
    return this.http.get<RegisterHistory[]>(`${this.baseUrl}/by-register/${registerId}`);
  }

  /** 🔹 Crear historial (backend lo usa internamente si lo deseas) */
  create(data: RegisterHistory): Observable<RegisterHistory> {
    return this.http.post<RegisterHistory>(`${this.baseUrl}`, data);
  }

  /** 🔹 Obtener un historial por ID */
  getById(id: number): Observable<RegisterHistory> {
    return this.http.get<RegisterHistory>(`${this.baseUrl}/${id}`);
  }

  /** 🔹 Listar todos */
  getAll(): Observable<RegisterHistory[]> {
    return this.http.get<RegisterHistory[]>(`${this.baseUrl}/all`);
  }

  /** 🔹 Listar solo eliminados */
  getDeleted(): Observable<RegisterHistory[]> {
    return this.http.get<RegisterHistory[]>(`${this.baseUrl}/deleted`);
  }

  /** 🔹 Restaurar un histórico eliminado */
  restore(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/restore`, {});
  }

  /** 🔹 Eliminar (soft delete) */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
