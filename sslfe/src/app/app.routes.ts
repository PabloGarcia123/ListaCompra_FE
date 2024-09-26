import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recoverPassword', component: RecoverPasswordComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes), FormsModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }