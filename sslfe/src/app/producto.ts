import { Lista } from "./lista";

export class Producto {
    id: number;
    nombre: string;
    cantidad: number;
    lista: Lista;  // Relación con Lista en lugar de lista_id
  
    constructor(id: number, nombre: string, cantidad: number, lista: Lista) {
      this.id = id;
      this.nombre = nombre;
      this.cantidad = cantidad;
      this.lista = lista;  // Aquí asignas un objeto Lista completo
    }
  }
  