import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recoverPassword', component: RecoverPasswordComponent },
    { path: 'modificar-contrasena/:token', component: ModifyPasswordComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'payment', component: PaymentComponent }


];

@NgModule({
    imports: [RouterModule.forRoot(routes), FormsModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }