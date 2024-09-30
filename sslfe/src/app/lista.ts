import { User } from "./user";

export class Lista {
    id: number;
    nombre: string;
    descripcion: string;
    productos: any[];
    miembros: any[];
    propietario: string;
    
    constructor(id: number, nombre: string, descripcion: string, productos: any[], miembros: any[], propietario: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion
        this.productos = productos;
        this.miembros = miembros;
        this.propietario = propietario;
    }
}