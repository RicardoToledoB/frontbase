import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // 🔹 importa CommonModule
import { User } from '../../../models/User';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, MatInputModule, MatButtonModule, MatDivider],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  user: User = { firstName: '', username: '', email: '' };

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    if (data) this.user = { ...data };
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const payload: User = { ...this.user };
    if (this.data?.id && !payload.password) {
      delete (payload as any).password;
    }
    this.dialogRef.close(payload);
  }
}
