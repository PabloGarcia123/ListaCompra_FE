export class Lista {
    id: number;
    nombre: string;
    descripcion: string;
    productos: any[];
    miembros: any[];
    
    constructor(id: number, nombre: string, descripcion: string, productos: any[], miembros: any[]) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion
        this.productos = productos;
        this.miembros = miembros;
    }
}