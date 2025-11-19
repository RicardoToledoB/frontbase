export interface User {
  id?: number;                     // <--- opcional otra vez
  firstName: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  email?: string;
  username?: string;
  password?: string;
  rut?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
