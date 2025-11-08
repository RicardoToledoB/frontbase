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
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-users',
  imports: [
    CommonModule, MatGridListModule, MatCardModule, MatTableModule,
    MatFormFieldModule, MatInputModule, MatDividerModule,
    MatButtonModule, MatSelectModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];

  displayedColumns: string[] = ['id', 'email','username', 'createdAt', 'edit'];


  constructor(private dialog: MatDialog, private userService: UserService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: { mensaje: 'Este es un mensaje pasado desde Stablishment' }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const newUser: User = {
          name: result,
          firstName: ''
        };
        this.userService.create(newUser).subscribe(saved => {
          console.log('Guardado en backend:', saved);
          this.users = [...this.users, saved]; // refrescar tabla local
        });
      }

      console.log('El modal fue cerrado con resultado:', result);
    });
  }

  ngOnInit(): void {
    this.loadStablishments();
  }

  loadStablishments(): void {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }


  edit(data: any) {
    console.log(data.id);
  }
}
