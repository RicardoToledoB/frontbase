import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './detail-register.component.html',
  styleUrls: ['./detail-register.component.css']
})
export class DetailRegisterComponent implements OnInit {
  register: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8080/api/v1/registers/${id}`).subscribe({
      next: (res) => this.register = res,
      error: (err) => console.error('Error al obtener detalle', err)
    });
  }

  back() {
    this.router.navigate(['/view/register']);
  }
}
