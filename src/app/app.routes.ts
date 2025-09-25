import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NavLayoutComponent } from './layouts/nav-layout/nav-layout.component';
import { NavLoginComponent } from './layouts/nav-login/nav-login.component';
import { LoginComponent } from './views/login/login.component';
import { StablishmentComponent } from './views/stablishment/stablishment.component';

export const routes: Routes = [
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
            { path: 'view/home', component: HomeComponent },
            { path: 'view/stablishment', component: StablishmentComponent}
        ]
    },
    { 
        path: '**', redirectTo: 'view/home' 
    }



];
