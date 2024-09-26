import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:9050/lists';
  constructor(private httpService:HttpClient) { }


  obtenerListas(): Observable<any> {
    const url = `${this.apiUrl}/lists/getLists`;
    return this.httpService.get<any>(url);
  }

  guardarLista(lista: any): Observable<any> {
    const url = `${this.apiUrl}/lists/saveList`;
    return this.httpService.post<any>(url, lista);
  }
}
