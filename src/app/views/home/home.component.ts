import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/security/auth.service';
import { User } from '../../models/User';
import { ChangePasswordComponent } from './change-password.component/change-password.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from "@angular/material/divider";
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatDivider
]
})
export class HomeComponent implements OnInit {
  user?: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog  // ✅ CORREGIDO
  ) {}

  ngOnInit(): void {
    const email = this.authService.getUserEmailFromToken();
    if (email) {
      this.userService.getByEmail(email).subscribe({
        next: (data) => (this.user = data),
        error: (err) => console.error('Error cargando usuario', err)
      });
    }
  }

  openChangePassword(): void {
    if (!this.user) return;

    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const { oldPassword, newPassword } = result;
        this.userService.changePassword(this.user!.id!, oldPassword, newPassword).subscribe({
          next: () => alert('Contraseña cambiada correctamente'),
          error: (err) => alert(err.error?.message || 'Error al cambiar la contraseña')
        });
      }
    });
  }
}
