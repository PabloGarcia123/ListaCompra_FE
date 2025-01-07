import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  constructor(private userService: UserService, private router: Router) {}

  userData = {
    email: '',
    pwd: ''
  };

  recoverPassword() {
    if (this.userData.email) {
      this.userService.recoverPassword(this.userData).subscribe(
        response => {
          if (response) {
            window.alert('Password recovery email sent successfully');
          }
        },
        error => {
          window.alert('Error sending password recovery email');
        }
      );
    } else {
      window.alert('Please enter a valid email address');
    }
  }
  
}
