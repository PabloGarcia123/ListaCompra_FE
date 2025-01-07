import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-modify-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {
  token: string = '';  // Aquí estamos esperando solo el string del token
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    // Obtener solo el token de la URL
    const urlToken = this.route.snapshot.paramMap.get('token') || '';
    this.token = urlToken.trim();  // Asegúrate de que no hay espacios en blanco alrededor
    //console.log('Token:', this.token);
  }

  modificarContrasena() {
    if (this.newPassword !== this.confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }

    if (this.newPassword.length < 8) {
      window.alert('Password must be at least 8 characters');
      return;
    }

    if (!/[0-9]/.test(this.newPassword)) {
      window.alert('Password must contain at least one number');
      return;
    }

    if (!/[A-Z]/.test(this.newPassword)) {
      window.alert('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[!@#\$%\^&_]/.test(this.newPassword)) {
      window.alert('Password must contain at least one special character');
      return;
    }

    this.userService.changePassword(this.token, this.newPassword).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        window.alert(response.message);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error en la solicitud:', error);
        if (error.status === 400) {
          window.alert('Error: ' + error.error);  // Muestra el mensaje del backend
        } else {
          window.alert('Error updating password');
        }
      }
    );
    
  }
}
