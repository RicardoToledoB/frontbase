import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegisterHistoryService } from '../../../services/register-history.service';

import { HistoryDetailDialog } from './history-detail-dialog'; // modal (lo creo abajo)
import { RegisterHistory } from '../../../models/RegisterHistory';

@Component({
  selector: 'app-detail-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './detail-register.component.html',
  styleUrls: ['./detail-register.component.css']
})
export class DetailRegisterComponent implements OnInit {

  register: any;
  history: RegisterHistory[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private historyService:RegisterHistoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 1) Obtener detalle del registro
    this.http.get(`http://localhost:8080/api/v1/registers/${id}`).subscribe({
      next: (res) => this.register = res,
      error: (err) => console.error('Error al obtener detalle', err)
    });

    // 2) Obtener historial
    this.historyService.getByRegister(id).subscribe({
      next: (data) => this.history = data,
      error: (err) => console.error('Error al obtener historial', err)
    });
  }

  back() {
    this.router.navigate(['/view/register']);
  }

  openHistoryDetail(row: RegisterHistory) {
    this.dialog.open(HistoryDetailDialog, {
      width: '650px',
      data: row
    });
  }
}
