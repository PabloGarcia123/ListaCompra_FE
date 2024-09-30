import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lista } from './lista';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiUrlBEL = 'http://localhost:9050';
  private apiUrlBEU = 'http://localhost:9000';

  constructor(private httpService: HttpClient) { }


  obtenerListas(): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/getLists`;
    return this.httpService.get<any>(url);
  }

  guardarLista(lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/saveList`;
    return this.httpService.post<any>(url, lista);
  }

  eliminarLista(lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/deleteList`;
    console.log('Lista:', lista);
    return this.httpService.post<any>(url, lista);
  }

  guardarProducto(producto: Producto, lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/saveProduct`;
    const payload = { producto, lista };
    console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  eliminarProducto(producto: Producto, lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/deleteProduct`;
    const payload = { producto, lista };
    console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }

  modificarProducto(producto: Producto, lista: Lista): Observable<any> {
    const url = `${this.apiUrlBEL}/lists/updateProduct`;
    const payload = { producto, lista };
    console.log('Payload:', payload);
    return this.httpService.post<any>(url, payload);
  }


  obtenerPropietarioLista(token: string): Observable<any> {
    const url = `${this.apiUrlBEU}/users/getUser`;
    const headers = { 'Token': `${token}` };
    console.log(headers);
    return this.httpService.get<string>(url, { headers });
  }
}
