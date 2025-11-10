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

import { ModalComponent } from './modal/modal.component';
import { ConfirmDialogComponent } from './modal/confirm-dialog/confirm-dialog.component';
import { Stablishment } from '../../models/Stablishment';
import { StablishmentService } from '../../services/stablishment.service';

@Component({
  selector: 'app-stablishment',
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
  templateUrl: './stablishment.component.html',
  styleUrls: ['./stablishment.component.css']
})
export class StablishmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Stablishment>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private stablishmentService: StablishmentService
  ) {}

  ngOnInit(): void {
    this.loadStablishments();
  }

  /** Cargar todos los establecimientos */
  loadStablishments(): void {
    this.stablishmentService.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  /** Filtro simple por nombre */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /** Abrir modal de nuevo o edición */
  openDialog(stablishment?: Stablishment): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: stablishment ? { ...stablishment } : null,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Stablishment | null) => {
      if (!result) return;

      if (result.id) {
        // Actualizar existente
        this.stablishmentService.update(result.id, result).subscribe(() => {
          this.loadStablishments();
        });
      } else {
        // Crear nuevo
        this.stablishmentService.create(result).subscribe(() => {
          this.loadStablishments();
        });
      }
    });
  }

  /** Editar establecimiento existente */
  edit(stablishment: Stablishment): void {
    this.openDialog(stablishment);
  }

  /** Confirmar y eliminar */
  confirmDelete(stablishment: Stablishment): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        title: 'Eliminar Establecimiento',
        message: `¿Seguro que desea eliminar "${stablishment.name}"? Esta acción no se puede deshacer.`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.stablishmentService.delete(stablishment.id!).subscribe(() => {
          this.loadStablishments();
        });
      }
    });
  }
}
