import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from '@angular/material/expansion';  // 👈 Aquí
import { AuthService } from '../../services/security/auth.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

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
