import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ModalComponent } from './modal/modal.component';
import { ConfirmDialogComponent } from './modal/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'firstLastName', 'email', 'username', 'rut', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /** Cargar todos los usuarios */
  loadUsers(): void {
    this.userService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  /** Buscar */
  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  /** Crear / Editar */
  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: user ? { ...user } : null,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (!result) return;

      if (result.id) {
        this.userService.update(result.id, result).subscribe(() => this.loadUsers());
      } else {
        this.userService.create(result).subscribe(() => this.loadUsers());
      }
    });
  }

  edit(user: User): void {
    this.openDialog(user);
  }

  confirmDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Usuario',
        message: `¿Está seguro de eliminar a ${user.firstName} ${user.firstLastName}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userService.delete(user.id!).subscribe(() => this.loadUsers());
      }
    });
  }
}
