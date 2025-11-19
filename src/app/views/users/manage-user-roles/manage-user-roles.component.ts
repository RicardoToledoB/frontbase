import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UserRoleService } from '../../../services/user-role.service'; // <-- sin espacio
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../models/User';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service ';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.css'],
  // si tu proyecto es standalone, agrega:
  // standalone: true,
  imports: [
    CommonModule,          // <-- NECESARIO para *ngFor, *ngIf, pipes, etc.
  FormsModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule,       // <-- NECESARIO para <mat-option>
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  ]
})
export class ManageUserRolesComponent implements OnInit {

  user!: User;
  roles: Role[] = [];
  assigned: Role[] = [];
  selectedRoleId: number | null = null;

  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ManageUserRolesComponent>,
    private userRoleService: UserRoleService,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.user = data.user;
  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadAssigned();
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }

  loadRoles(): void {
    this.roleService.getAll().subscribe({
      next: (res) => this.roles = res,
      error: () => this.showMessage('Error al cargar los roles disponibles')
    });
  }

  loadAssigned(): void {
    this.userRoleService.getByUser(this.user.id!).subscribe({
      next: (res) => this.assigned = res,
      error: () => this.showMessage('Error al cargar los roles del usuario')
    });
  }

  addRole(): void {
    if (!this.selectedRoleId) {
      this.showMessage('Seleccione un rol');
      return;
    }

    if (this.assigned.some(r => r.id === this.selectedRoleId)) {
      this.showMessage('El usuario ya tiene ese rol');
      return;
    }

    this.userRoleService.assign(this.user.id!, this.selectedRoleId).subscribe({
      next: () => {
        this.showMessage('Rol agregado correctamente');
        this.selectedRoleId = null;
        this.loadAssigned();
      },
      error: () => this.showMessage('Error al agregar el rol')
    });
  }

  removeRole(role: Role): void {
    this.userRoleService.remove(this.user.id!, role.id!).subscribe({
      next: () => {
        this.showMessage('Rol eliminado correctamente');
        this.loadAssigned();
      },
      error: () => this.showMessage('Error al eliminar el rol')
    });
  }
}
