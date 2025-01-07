import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'] // Cambié 'styleUrl' a 'styleUrls'
})
export class PaymentComponent{

  stripePublicKey = "pk_test_51P1sD3RsjKhkWbXKiJ2xBJhT0tVQnn92NdZazOcLQ6RPYzo4nz0CzsFIu5hMmuBfVgf9N0nEi7W1NVSkg2S7qAl400CaKUltEy";
  userPanelOpen: boolean = false;
  stripe: Stripe | null = null; // Tipo de Stripe o null
  card: StripeCardElement | null = null; // Tipo de StripeCardElement o null

  constructor(private router: Router, private paymentService: PaymentService, private userService: UserService) { }

  seguirConPlanGratis() {
    this.router.navigate(['/home']); // Redirige a la página principal
  }

  toggleUserPanel() {
    this.userPanelOpen = !this.userPanelOpen;
  }

  mejorarPlan() {
    window.location.href = 'https://buy.stripe.com/test_aEU7sy4qDd3xf5ueUU';

    const token = localStorage.getItem('token');
    if(token){
      this.userService.obtenerUsuarioPorToken(token).subscribe(
        (response) => {
          const email = response.email;
          console.log('Email:', response.email);
          if(email){
            this.userService.establecerPremium(email).subscribe(
              (data) => {
                console.log('Datos recibidos:', data);
              }
            );
          }
        }
      );
    }
  
  }
  verificarEstadoPremium() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.obtenerUsuarioPorToken(token).subscribe(
        (response) => {
          if (response.premium) {
            alert('¡Tu cuenta ahora es premium!');
          } else {
            alert('El estado premium aún no se ha actualizado. Intenta nuevamente más tarde.');
          }
        },
        (error) => {
          console.error('Error al verificar el estado premium:', error);
        }
      );
    }
  }
  
  irListas(){
    this.router.navigate(['/home']);
  }
  irNotificaciones() {
    this.router.navigate(['/notifications']);
  }

  irMiPlan() {
    this.router.navigate(['/payment']);
  }

  cerrarSesion() {
    localStorage.removeItem('token'); // O cualquier lógica para cerrar sesión
    this.router.navigate(['/login']); // Redirigir a la página de inicio o login
  }
}
