import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router, private userService: UserService) { }

  userData = {
    email: '',
    pwd1: '',
    pwd2: '',
    nombre: '',
    apellidos: '',
    dni: '',
    fechaNacimiento: '',
    telefono: ''

  }

  submitRegistro() {
    if (
      !this.userData.email ||
      !this.userData.pwd1 ||
      !this.userData.pwd2 ||
      !this.userData.nombre ||
      !this.userData.apellidos ||
      !this.userData.dni ||
      !this.userData.telefono ||
      !this.userData.fechaNacimiento
      
    ) {
      this.mostrarLabelMensaje("Rellene todos los campos");
      return;
    }
    //Email válido
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(this.userData.email)) {
      console.log('Email no válido');
      this.mostrarLabelMensaje("Email no válido");
    }
    //La contraseña debe tener al menos 8 caracteres
    if (this.userData.pwd1.length < 8
      //Al menos un número
      || !/[0-9]/.test(this.userData.pwd1)
      //Al menos una letra mayúscula
      || !/[A-Z]/.test(this.userData.pwd1)
      //Al menos un caracter especial
      || !/[!@#\$%\^&_]/.test(this.userData.pwd1)) {
      console.log('La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un caracter especial');
      this.mostrarLabelMensaje("La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un caracter especial");
      return;
    }
    //Las contraseñas deben coincidir
    if (this.userData.pwd1 !== this.userData.pwd2) {
      console.log('Las contraseñas no coinciden');
      this.mostrarLabelMensaje("Las contraseñas no coinciden");
      return;
    }
    //El nombre solo puede contener letras y caracter en blanco
    if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/.test(this.userData.nombre)) {
      console.log('El nombre solo puede contener letras');
      this.mostrarLabelMensaje("El nombre solo puede contener letras");
      return;
    }
    
    //Los apellidos solo pueden contener letras y caracter en blanco
    if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/.test(this.userData.apellidos)) {
      console.log('Los apellidos solo pueden contener letras');
      this.mostrarLabelMensaje("Los apellidos solo pueden contener letras");
      return;
    }
    //El DNI debe tener 8 números y una letra
    if (!/^[0-9]{8}[A-Z]$/.test(this.userData.dni)) {
      console.log('El DNI debe tener 8 números y una letra');
      this.mostrarLabelMensaje("El DNI debe tener 8 números y una letra");
      return;
    }
    //La fecha de nacimiento debe tener el formato yyyy-mm-dd
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(this.userData.fechaNacimiento)) {
      console.log('La fecha de nacimiento debe tener el formato yyyy-mm-dd');
      this.mostrarLabelMensaje("La fecha de nacimiento debe tener el formato yyyy-mm-dd");
      return;
    }
    //El teléfono debe tener 9 números
    if (!/^[0-9]{9}$/.test(this.userData.telefono)) {
      console.log('El teléfono debe tener 9 números');
      this.mostrarLabelMensaje("El teléfono debe tener 9 números");
      return;
    }


    this.userService.registerUser1(this.userData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al enviar los datos del registro', error);
        console.log(this.userData);
        if (error.status === 409) {
          this.mostrarLabelMensaje("El usuario ya está registrado");
        }
      }
    );
  }
  mostrarLabelMensaje(mensaje: string) {
    let labelMensaje = document.getElementById('mensaje');
    if(labelMensaje){
      labelMensaje.style.display = 'none';
      setTimeout(() => { labelMensaje.style.display = 'block'; } ,200);
      labelMensaje.innerText = mensaje;
    }
  }
}
