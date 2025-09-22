import { Component } from '@angular/core';
import { MatGridList, MatGridListModule } from "@angular/material/grid-list";
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-stablishment',
  imports: [MatGridListModule, MatCardModule,MatGridList,MatCard],
  templateUrl: './stablishment.component.html',
  styleUrl: './stablishment.component.css'
})
export class StablishmentComponent {

}
