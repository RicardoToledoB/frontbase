import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatCard,
    MatDialogModule,
    DialogModule,
],
})
export class RegistersComponent implements OnInit {
  
  displayedColumns: string[] = [
    'id',
    'n_inventary',
    'description_property',
    'stablishment',
    'state',
    'user',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRegisters();
  }




  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  loadRegisters() {
    const url = `http://localhost:8080/api/v1/registers/getAllPaginated?page=${this.pageIndex}&size=${this.pageSize}&sort=id,asc`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Error al cargar registros', err),
    });
  }

  

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRegisters();
  }

  viewDetail(row: any) {
   this.router.navigate(['/view/register', row.id]);
  }
}
