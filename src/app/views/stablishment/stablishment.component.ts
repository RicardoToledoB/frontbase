import { Component } from '@angular/core';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { Stablishment } from '../../models/Stablishment';
import { StablishmentService } from '../../services/stablishment.service';
import { CommonModule, DatePipe } from '@angular/common';



@Component({
  selector: 'app-stablishment',
  standalone: true,
  imports: [
    CommonModule,MatGridListModule, MatCardModule, MatTableModule, 
    MatFormFieldModule, MatInputModule, MatDividerModule,
    MatButtonModule, MatSelectModule, MatIconModule  ],
  templateUrl: './stablishment.component.html',
  styleUrls: ['./stablishment.component.css']
})
export class StablishmentComponent {

  stablishments: Stablishment[] = [];

  displayedColumns: string[] = ['id', 'name','createdAt','edit'];
  

  constructor(private dialog: MatDialog,private stablishmentService: StablishmentService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: { mensaje: 'Este es un mensaje pasado desde Stablishment' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado con resultado:', result);
    });
  }

  ngOnInit(): void {
    this.loadStablishments();
  }

  loadStablishments(): void {
    this.stablishmentService.getAll().subscribe(data => {
      this.stablishments = data;
      console.log(this.stablishments);
    });
  }



}
