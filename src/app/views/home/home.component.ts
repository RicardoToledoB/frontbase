import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // 👈 IMPORTA ESTO
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/security/auth.service';
import { User } from '../../models/User';
import { MatCard, MatCardModule } from "@angular/material/card";
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   standalone: true,
  imports: [MatCardModule,MatCard,DatePipe,CommonModule,MatIconModule]
})
export class HomeComponent implements OnInit {

  user?: User;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const email = this.authService.getUserEmailFromToken();
    if (email) {
      this.userService.getByEmail(email).subscribe({
        next: (data) => {
          console.log('Usuario cargado:', data);
          this.user = data;
        },
        error: (err) => console.error('Error cargando usuario', err)
      });
    }
  }
}
