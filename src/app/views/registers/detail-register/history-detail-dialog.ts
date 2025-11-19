import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Detalle de Cambios</h2>

    <mat-dialog-content>

      <h3>Antes</h3>
      <pre>{{ before | json }}</pre>

      <h3>Después</h3>
      <pre>{{ after | json }}</pre>

      <h3>Cambios detectados</h3>

      <table class="diff-table" *ngIf="diff && keys.length > 0">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Antes</th>
            <th>Después</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let key of keys"
              [ngClass]="{
                'added': diff[key].old === null && diff[key].new !== null,
                'removed': diff[key].old !== null && diff[key].new === null,
                'modified': diff[key].old !== diff[key].new
              }">

            <td><strong>{{ key }}</strong></td>
            <td>{{ diff[key].old }}</td>
            <td>{{ diff[key].new }}</td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="keys.length === 0">No se detectaron cambios</p>

    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .diff-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .diff-table th, .diff-table td {
      border: 1px solid #ccc;
      padding: 6px;
    }
    .added { background-color: #d4edda; }     /* verde */
    .removed { background-color: #f8d7da; }   /* rojo */
    .modified { background-color: #fff3cd; }  /* amarillo */
  `]
})
export class HistoryDetailDialog implements OnInit {

  before: any = {};
  after: any = {};
  diff: any = {};
  keys: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {

    this.before = this.safeParse(this.data.jsonBefore);
    this.after = this.safeParse(this.data.jsonAfter);
    this.diff = this.safeParse(this.data.jsonDiff);

    this.keys = this.diff ? Object.keys(this.diff) : [];
  }

  safeParse(str: string): any {
    if (!str) return {};
    try {
      return JSON.parse(str);
    } catch (e) {
      return {};
    }
  }
}
