import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from '@angular/material/expansion';  // 👈 Aquí
import { AuthService } from '../../services/security/auth.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ChangePasswordComponent } from '../../views/utils/change-password.component/change-password.component';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrl: './nav-layout.component.css',
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    RouterOutlet,
    RouterModule,
    MatMenuModule,
    MatMenu,
    MatExpansionModule
]
})
export class NavLayoutComponent {


    user?: User;
  private breakpointObserver = inject(BreakpointObserver);
    authService = inject(AuthService); // 👈 necesario para poder usar logout()

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout(){
      this.authService.logout();
    }

    
      constructor(
        private userService: UserService,
        private dialog: MatDialog ,
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
