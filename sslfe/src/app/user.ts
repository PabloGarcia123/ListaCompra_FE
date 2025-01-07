export class User {
  email: string;
  pwd1: string;
  pwd2: string;
  nombre: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  premium: boolean;
  
  constructor(email: string, pwd1: string, pwd2: string, nombre: string, apellidos: string, dni: string, fechaNacimiento: string, telefono: string, premium: boolean) {
    this.email = email;
    this.pwd1 = pwd1;
    this.pwd2 = pwd2;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
    this.fechaNacimiento = fechaNacimiento;
    this.telefono = telefono;
    this.premium = premium;
  }
}

export class Miembro {
  id: number;
  email: string;
  lista_id: number;

  constructor(id: number, email: string, lista_id: number) {
    this.id = id;
    this.email = email;
    this.lista_id = lista_id;
  }
  
}