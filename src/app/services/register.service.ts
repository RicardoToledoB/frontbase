// register.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../models/Register';
// import { environment } from '../../environments/environment'; // si usas environments

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // pageIndex
}

@Injectable({ providedIn: 'root' })
export class RegisterService {
  // Recomendado: tomar la base desde environment
  // private apiUrl = `${environment.apiUrl}/registers`;
  private apiUrl = 'http://localhost:8080/api/v1/registers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Register> {
    return this.http.get<Register>(`${this.apiUrl}/${id}`);
  }

  create(register: Register): Observable<Register> {
    return this.http.post<Register>(this.apiUrl, register);
  }

  update(id: number, register: Register): Observable<Register> {
    return this.http.put<Register>(`${this.apiUrl}/${id}`, register);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSummaryByStablishment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/summary-by-stablishment`);
  }


  getActive() {
  return this.http.get<Register[]>(`${this.apiUrl}`);
}




getDeleted() {
  return this.http.get<Register[]>(`${this.apiUrl}/deleted`);
}

restore(id: number) {
  return this.http.post(`${this.apiUrl}/${id}/restore`, {});
}


getDeletedPaginated(page: number, size: number, search: string = '') {
  let params = new HttpParams()
    .set('page', page)
    .set('size', size);

  if (search.trim() !== '') {
    params = params.set('search', search.trim());
  }

  return this.http.get<PageResponse<Register>>(
    `${this.apiUrl}/deleted-paginated`,
    { params }
  );
}


exportExcel(type: 'active' | 'deleted', search?: string) {
  const params = new URLSearchParams();
  params.set('type', type);
  if (search && search.trim() !== '') params.set('search', search.trim());
  const url = `${this.apiUrl}/export?${params.toString()}`;
  return this.http.get(url, { responseType: 'blob' });
}




  // 🔹 Método que te sugerí (basado en tu endpoint existente)
  getPaginated(page: number, size: number, sort = 'id,asc', search?: string) {
  let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('sort', sort);

  if (search) {
    params = params.set('search', search);
  }

  return this.http.get<PageResponse<Register>>(
    `${this.apiUrl}/getAllPaginated`,
    { params }
  );
}

}
