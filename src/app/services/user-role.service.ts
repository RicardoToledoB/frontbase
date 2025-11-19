import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "../models/Role";

@Injectable({ providedIn: 'root' })
export class UserRoleService {

  private base = 'http://localhost:8080/api/v1/users_roles';

  constructor(private http: HttpClient) {}

  getByUser(userId: number) {
    return this.http.get<Role[]>(`${this.base}/user/${userId}`);
  }

  assign(userId: number, roleId: number) {
    return this.http.post(`${this.base}/assign?userId=${userId}&roleId=${roleId}`, {});
  }

  remove(userId: number, roleId: number) {
    return this.http.delete(`${this.base}/remove?userId=${userId}&roleId=${roleId}`);
  }
}
