import { Lista } from "./lista";

export class Invitation {
    id: number       // ID de la lista
    lista: Lista;     // Nombre de la lista
    email: string;    // Email del propietario de la lista
    token: string;    // Token de la invitación
    fechaCreacion: number;  // Fecha de creación de la invitación
    used: boolean;    // Indica si la invitación ha sido utilizada

    constructor(id: number, lista: Lista, email: string, token: string, fechaCreacion: number, used: boolean) {
        this.id = id;
        this.lista = lista;
        this.email = email;
        this.token = token;
        this.fechaCreacion = fechaCreacion;
        this.used = used;
    }
}
