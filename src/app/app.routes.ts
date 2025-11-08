import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NavLayoutComponent } from './layouts/nav-layout/nav-layout.component';
import { NavLoginComponent } from './layouts/nav-login/nav-login.component';
import { LoginComponent } from './views/login/login.component';
import { StablishmentComponent } from './views/stablishment/stablishment.component';
import { RegistersComponent } from './views/registers/registers.component';
import { UsersComponent } from './views/users/users.component';
import { DetailRegisterComponent } from './views/registers/detail-register/detail-register.component'; // 👈 agregado
import { AuthGuard } from './services/security/auth.guard';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AuthRedirectGuard } from './services/security/auth-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthRedirectGuard],
    children: []
  },
  {
    path: '',
    component: NavLoginComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    component: NavLayoutComponent,
    children: [
      { path: 'view/home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'view/register', component: RegistersComponent, canActivate: [AuthGuard] },
      { path: 'view/register/:id', component: DetailRegisterComponent, canActivate: [AuthGuard] }, // 👈 nueva ruta detalle
      { path: 'view/user', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'view/stablishment', component: StablishmentComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
