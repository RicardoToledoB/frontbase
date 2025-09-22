import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatGridList, MatGridListModule } from "@angular/material/grid-list";
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-home',
  imports: [RouterModule, MatGridListModule, MatCardModule,MatGridList,MatCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
