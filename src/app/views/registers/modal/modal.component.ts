import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule,MatInput,FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

   date_reception: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

   save(): void {
    this.dialogRef.close(this.date_reception);
  }
}
