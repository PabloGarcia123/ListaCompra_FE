import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrlBEU = 'http://localhost:9000';
  
  constructor(private httpService: HttpClient) { }


  pagar(token: string) {
    const url = `${this.apiUrlBEU}/payments/pay`;
    // Envía el token y posiblemente otra información necesaria
    return this.httpService.post<any>(url, { token });
  }

}
