import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from "@angular/material/divider";
import { MatIconModule } from '@angular/material/icon';

import { Register } from '../../../models/Register';
import { Stablishment } from '../../../models/Stablishment';
import { StablishmentService } from '../../../services/stablishment.service';
import { AuthService } from '../../../services/security/auth.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDivider,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ provideNativeDateAdapter() ]
})
export class ModalComponent implements OnInit {

  form!: FormGroup;
  stablishments: Stablishment[] = [];
  loadingStablishments = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Register,
    private stablishmentService: StablishmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStablishments();

    if (this.data?.stablishment?.id) {
      this.form.patchValue({ stablishment: this.data.stablishment.id });
    }
  }

  private safeText(value: any): string {
    return value ? String(value) : '';
  }

  private safeDate(value: any): Date | null {
    if (!value) return null;
    if (value === '0000-00-00') return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [this.data?.id ?? null],

      n_inventary: [this.safeText(this.data?.n_inventary)],
      n_memo: [this.safeText(this.data?.n_memo)],
      project: [this.safeText(this.data?.project)],
      financing: [this.safeText(this.data?.financing)],
      n_acta_reception: [this.safeText(this.data?.n_acta_reception)],
      purchase_order: [this.safeText(this.data?.purchase_order)],
      acquisition_value: [this.safeText(this.data?.acquisition_value)],
      provider: [this.safeText(this.data?.provider)],
      rut_provider: [this.safeText(this.data?.rut_provider)],
      n_fact: [this.safeText(this.data?.n_fact)],
      amount_fact: [this.safeText(this.data?.amount_fact)],
      n_dispatch_guide: [this.safeText(this.data?.n_dispatch_guide)],
      amount_dispatch_guide: [this.safeText(this.data?.amount_dispatch_guide)],
      description_property: [this.safeText(this.data?.description_property)],
      brand: [this.safeText(this.data?.brand)],
      model: [this.safeText(this.data?.model)],
      n_serie: [this.safeText(this.data?.n_serie)],
      n_res_info: [this.safeText(this.data?.n_res_info)],
      n_res_gore: [this.safeText(this.data?.n_res_gore)],
      n_res_accept: [this.safeText(this.data?.n_res_accept)],
      observation_state: [this.safeText(this.data?.observation_state)],

      date_reception: [this.safeDate(this.data?.date_reception)],
      date_acta_reception: [this.safeDate(this.data?.date_acta_reception)],
      date_fact: [this.safeDate(this.data?.date_fact)],
      date_dispatch_guide: [this.safeDate(this.data?.date_dispatch_guide)],
      date_res_info: [this.safeDate(this.data?.date_res_info)],
      date_res_gore: [this.safeDate(this.data?.date_res_gore)],
      date_res_accept: [this.safeDate(this.data?.date_res_accept)],

      state: [this.safeText(this.data?.state) || 'PENDIENTE', Validators.required],
      stablishment: [this.data?.stablishment?.id ?? null, Validators.required]
    });
  }

  private loadStablishments(): void {
    this.loadingStablishments = true;
    this.stablishmentService.getAll().subscribe({
      next: res => { this.stablishments = res ?? []; this.loadingStablishments = false; },
      error: () => { this.stablishments = []; this.loadingStablishments = false; }
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const userId = this.authService.getUserIdFromToken();
    const v = this.form.value;

    const dateFields = [
      'date_reception','date_acta_reception','date_fact',
      'date_dispatch_guide','date_res_info','date_res_gore','date_res_accept'
    ];

    dateFields.forEach(f => {
      if (v[f] instanceof Date) v[f] = v[f].toISOString().split('T')[0];
    });

    const payload: Register = {
      ...v,
      stablishment: { id: v.stablishment },
      user: { id: userId }
    };

    this.dialogRef.close(payload);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
