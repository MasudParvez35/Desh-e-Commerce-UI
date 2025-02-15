import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'', redirectTo: 'dashboard', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path: 'sign-up', component: SignupComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path:'', component: HeaderComponent, children: [
            {path:'dashboard', component: DashboardComponent}
        ]
    }
];
