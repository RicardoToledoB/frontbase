import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RegisterService } from '../../services/register.service';
import { Register } from '../../models/Register';
import { ModalComponent } from './modal/modal.component';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-registers',
  standalone: true,
  imports: [
    CommonModule,
    // Material necesarios para que el template NO marque rojo:
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDivider
],
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css'],
})
export class RegistersComponent implements OnInit {
  displayedColumns = [
    'id',
    'n_inventary',
    'description_property',
    'stablishment',
    'state',
    'createdAt',
    'user',
    'updatedAt',
    'actions',
  ];

  dataSource = new MatTableDataSource<Register>([]);
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchTerm = '';
  isLoading = false;
  showingDeleted = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private registerService: RegisterService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRegisters();
  }

  exportExcel(): void {
  const type = this.showingDeleted ? 'deleted' : 'active';
  this.registerService.exportExcel(type, this.searchTerm).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Inventario_${type}${this.searchTerm ? '_filter' : ''}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      this.showMessage(`Excel (${type}) exportado correctamente`);
    },
    error: () => this.showMessage('Error al exportar Excel'),
  });
}



  loadRegisters(): void {
    this.isLoading = true;
    this.registerService
      .getPaginated(this.pageIndex, this.pageSize, 'id,asc', this.searchTerm)
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.content;
          this.totalElements = res.totalElements;
          this.isLoading = false;
        },
        error: () => {
          this.showMessage('Error al cargar registros');
          this.isLoading = false;
        },
      });
  }

  onPaginateChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRegisters();
  }

  

  openModal(register?: Register): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: register ? { ...register } : {},
    });

    dialogRef.afterClosed().subscribe((result: Register | undefined) => {
      if (!result) return;

      if (result.id) {
        this.updateRegister(result);
      } else {
        this.createRegister(result);
      }
    });
  }

  createRegister(register: Register): void {
    this.registerService.create(register).subscribe({
      next: () => {
        this.showMessage('Registro creado correctamente');
        this.loadRegisters();
      },
      error: () => this.showMessage('Error al crear registro'),
    });
  }

  editRegister(register: Register): void {
    this.openModal(register);
  }

  updateRegister(register: Register): void {
    this.registerService.update(register.id!, register).subscribe({
      next: () => {
        this.showMessage('Registro actualizado correctamente');
        this.loadRegisters();
      },
      error: () => this.showMessage('Error al actualizar registro'),
    });
  }

  viewDetail(register: Register): void {
    this.router.navigate(['/view/register', register.id]);
  }

  private showMessage(msg: string): void {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
  }

  deleteRegister(id: number): void {
  if (confirm('¿Desea eliminar este registro?')) {
    this.registerService.delete(id).subscribe({
      next: () => {
        this.showMessage('Registro eliminado correctamente');
        this.loadRegisters();
      },
      error: () => this.showMessage('Error al eliminar registro'),
    });
  }
}

restoreRegister(id: number): void {
  if (confirm('¿Desea restaurar este registro?')) {
    this.registerService.restore(id).subscribe({
      next: () => {
        this.showMessage('Registro restaurado correctamente');
        this.loadDeleted(); // recargar lista de eliminados
      },
      error: () => this.showMessage('Error al restaurar registro'),
    });
  }
}

loadActive(): void {
  this.isLoading = true;
  this.showingDeleted = false;
  this.registerService
    .getPaginated(this.pageIndex, this.pageSize, 'id,asc', this.searchTerm)
    .subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
        this.totalElements = res.totalElements;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
}



loadDeleted(): void {
  this.showingDeleted = true;
  this.isLoading = true;
  this.pageIndex = 0; // 🟩 reiniciar paginación

  this.registerService
    .getDeletedPaginated(this.pageIndex, this.pageSize, this.searchTerm)
    .subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
        this.totalElements = res.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showMessage('Error al cargar eliminados');
      },
    });
}

applyFilter(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.searchTerm = input.value.trim().toLowerCase();
  this.pageIndex = 0;

  if (this.showingDeleted) {
    this.loadDeleted();
  } else {
    this.loadRegisters();
  }
}


}
