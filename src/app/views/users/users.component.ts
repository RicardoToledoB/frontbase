import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ModalComponent } from './modal/modal.component';
import { ConfirmDialogComponent } from './modal/confirm-dialog/confirm-dialog.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'firstLastName',
    'email',
    'username',
    'rut',
    'createdAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showingDeleted = false;
  searchTerm = '';

  constructor(private dialog: MatDialog, private userService: UserService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadActive();
  }

  /** Cargar usuarios activos */
  loadActive(): void {
    this.showingDeleted = false;
    this.userService.getActive().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  /** Cargar usuarios eliminados */
  loadDeleted(): void {
    this.showingDeleted = true;
    this.userService.getDeleted().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  /** Buscar */
  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchTerm = value;
    this.dataSource.filter = value;
  }

  /** Crear / Editar */
  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: user ? { ...user } : null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (!result) return;
      if (result.id) {
        this.userService.update(result.id, result).subscribe(() => this.loadActive());
      } else {
        this.userService.create(result).subscribe(() => this.loadActive());
      }
    });
  }

  edit(user: User): void {
    this.openDialog(user);
  }

 private showMessage(msg: string): void {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
  }

  /** Eliminar (Soft Delete) */
  confirmDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Usuario',
        message: `¿Está seguro de eliminar a ${user.firstName} ${user.firstLastName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.showMessage('Registro eliminado correctamente');
        this.userService.delete(user.id!).subscribe(() => this.loadActive());
      }
    });
  }

  /** Restaurar usuario eliminado */
  restoreUser(id: number): void {
     if (confirm('¿Desea restaurar este registro?')) {
      this.userService.restore(id).subscribe({
        next: () => {
          this.showMessage('Registro restaurado correctamente');
          this.loadDeleted(); // recargar lista de eliminados
        },
        error: () => this.showMessage('Error al restaurar registro'),
      });
    }
  }

  /** Exportar Excel */
  exportExcel(): void {
    const type = this.showingDeleted ? 'deleted' : 'active';
    this.userService.exportExcel(type).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Usuarios_${type}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  openRoles(user: any) {
  this.dialog.open(ManageUserRolesComponent, {
    width: '600px',
    data: { user }
  });
}
}
