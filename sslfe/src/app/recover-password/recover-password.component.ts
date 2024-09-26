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

  onPulse() {
    this.userService.recoverPassword(this.userData).subscribe(
      response => {
        if(response){
          window.alert('Password recovered successfully');
        }
      },
      error => {
        window.alert('Error recovering password');
      }
    );
  }
}
