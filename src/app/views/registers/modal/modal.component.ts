import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    MatDatepickerModule,
    MatNativeDateModule
  ]
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
  }

  /** Inicializa el formulario con todos los campos del Register */
  private initForm(): void {
    this.form = this.fb.group({
      id: [this.data?.id ?? null],

      // Datos principales
      n_inventary: [this.data?.n_inventary ?? '', Validators.required],
      date_reception: [this.data?.date_reception ?? ''],
      n_memo: [this.data?.n_memo ?? ''],
      project: [this.data?.project ?? ''],
      financing: [this.data?.financing ?? ''],
      n_acta_reception: [this.data?.n_acta_reception ?? ''],
      date_acta_reception: [this.data?.date_acta_reception ?? ''],
      purchase_order: [this.data?.purchase_order ?? ''],
      acquisition_value: [this.data?.acquisition_value ?? ''],
      provider: [this.data?.provider ?? ''],
      rut_provider: [this.data?.rut_provider ?? ''],
      n_fact: [this.data?.n_fact ?? ''],
      date_fact: [this.data?.date_fact ?? ''],
      amount_fact: [this.data?.amount_fact ?? ''],
      n_dispatch_guide: [this.data?.n_dispatch_guide ?? ''],
      date_dispatch_guide: [this.data?.date_dispatch_guide ?? ''],
      amount_dispatch_guide: [this.data?.amount_dispatch_guide ?? ''],
      description_property: [this.data?.description_property ?? '', Validators.required],
      brand: [this.data?.brand ?? ''],
      model: [this.data?.model ?? ''],
      n_serie: [this.data?.n_serie ?? ''],
      n_res_info: [this.data?.n_res_info ?? ''],
      date_res_info: [this.data?.date_res_info ?? ''],
      observation_state: [this.data?.observation_state ?? ''],
      n_res_gore: [this.data?.n_res_gore ?? ''],
      date_res_gore: [this.data?.date_res_gore ?? ''],
      n_res_accept: [this.data?.n_res_accept ?? ''],
      date_res_accept: [this.data?.date_res_accept ?? ''],
      state: [this.data?.state ?? 'PENDIENTE', Validators.required],

      // Relaciones
      stablishment: [this.data?.stablishment?.id ?? null, Validators.required],
    });
  }

  /** Carga la lista de establecimientos */
  private loadStablishments(): void {
    this.loadingStablishments = true;
    this.stablishmentService.getAll().subscribe({
      next: (items) => {
        this.stablishments = items ?? [];
        this.loadingStablishments = false;
      },
      error: () => {
        this.stablishments = [];
        this.loadingStablishments = false;
      }
    });
  }

  /** Envia los datos al componente padre */
  save(): void {
    if (this.form.invalid) return;

    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('No se encontró user.id en el token JWT');
      return;
    }

    const v = this.form.value;

    // Convertimos los campos de fecha a ISO yyyy-MM-dd si son objetos Date
    const dateFields = [
      'date_reception', 'date_acta_reception', 'date_fact',
      'date_dispatch_guide', 'date_res_info', 'date_res_gore', 'date_res_accept'
    ];
    dateFields.forEach(f => {
      if (v[f] instanceof Date) v[f] = v[f].toISOString().split('T')[0];
    });

    const payload: Register = {
      ...v,
      stablishment: v.stablishment ? { id: v.stablishment } : undefined,
      user: { id: userId }
    };

    this.dialogRef.close(payload);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
