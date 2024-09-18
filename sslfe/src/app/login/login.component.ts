import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}
  
  userData = {
    email: '',
    password: ''
  };

  login() {

    this.userService.loginUser(this.userData).subscribe(
      response => {
      console.log('Datos enviados con exito', response);
      //this.router.navigate(['/home']);
    });
  }

}
