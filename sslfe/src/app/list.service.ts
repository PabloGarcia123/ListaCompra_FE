import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lista } from './lista';
import { Producto } from './producto';
import { Miembro } from './user';
import { Invitation } from './invitation';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiUrlBEL = 'http://localhost:9050';
  private apiUrlBEU = 'http://localhost:9000';

  constructor(private httpService: HttpClient) { }


  obtenerListasPropietarioPorUsuario(email: string): Observable<any> {
    //console.log('Email:', email);
    const url = `${this.apiUrlBEL}/lists/getListsByUser?email=${email}`;
    return this.httpService.get<any>(url);
  }

  obtenerListasMiembroPorUsuario(email: string): Observable<any> {
    //console.log('Email:', email);
    const url = `${this.apiUrlBEL}/members/getListsByUser?email=${email}`;
    return this.httpService.get<any>(url);
  }

  guardarLista(lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/saveList`;
    //console.log('Lista:', lista);
    return this.httpService.post<any>(url, lista);
  }

  eliminarLista(lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/deleteList`;
    //console.log('Lista:', lista);
    return this.httpService.post<any>(url, lista);
  }

  guardarProducto(producto: Producto, lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/saveProduct`;
    const payload = { producto, lista };
    //console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  eliminarProducto(producto: Producto, lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/deleteProduct`;
    const payload = { producto, lista };
    //console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  modificarProducto(producto: Producto, lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/updateProduct`;
    const payload = { producto, lista };
    //console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  obtenerPropietarioLista(token: string): Observable<any> {
    const url = `${this.apiUrlBEU}/users/getUser`;
    const headers = { 'Token': `${token}` };
    //console.log(headers);
    return this.httpService.get<string>(url, { headers });
  }

  generarEnlaceInvitacion(lista: Lista, email: string): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/generateInvitation`;
    const payload = { lista, email };
    //console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  eliminarMiembro(lista: Lista, miembro: Miembro): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/deleteMember`;
    const payload = { lista, miembro };
    //console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  dejarDeSerMiembro(listaId: number, email: string): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/unsuscribeList`;
    const payload = { listaId, email };  // Cambiamos "lista" a "listaId"
    //console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  obtenerInvitacion(lista_id: number): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/getInvitation/${lista_id}`;
    //console.log('Fetching invitations from:', url);
    return this.httpService.get<Invitation>(url);
  }
  obtenerInvitaciones(email: string): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/getInvitations/${email}`;
    //console.log('Fetching invitations from:', url);
    return this.httpService.get<Invitation>(url);
  }
  
  aceptarInvitacion(token: string): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/acceptInvitation/${token}`;
    return this.httpService.get<any>(url);
  }

  rechazarInvitacion(token: string): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/rejectInvitation/${token}`;
    return this.httpService.delete<any>(url);
  }
}
