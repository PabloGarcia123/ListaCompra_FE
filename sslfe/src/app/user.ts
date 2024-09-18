export class User {
  email: string;
  pwd1: string;
  pwd2: string;
  nombre: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  
  constructor(email: string, pwd1: string, pwd2: string, nombre: string, apellidos: string, dni: string, fechaNacimiento: string, telefono: string) {
    this.email = email;
    this.pwd1 = pwd1;
    this.pwd2 = pwd2;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
    this.fechaNacimiento = fechaNacimiento;
    this.telefono = telefono;
  }
}