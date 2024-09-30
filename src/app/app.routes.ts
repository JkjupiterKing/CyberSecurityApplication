import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SqlInjectionComponent } from './sql-injection/sql-injection.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'sql-injection',
        component: SqlInjectionComponent,
    },
    {
        path: 'layout',
        component: LayoutComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
