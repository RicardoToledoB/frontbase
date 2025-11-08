import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/security/auth.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  countdown = 3; // segundos antes de redirigir

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);

        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/view/home']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    }, 1000);
  }
}
