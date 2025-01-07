import { ApplicationModule, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private apiUrl = 'https://alarcos.esi.uclm.es/fakeAccountsBE'
  private apiUrl = 'http://localhost:9000'
  constructor(private httpService: HttpClient) { }

  registerUser1(user: any) {
    const url = `${this.apiUrl}/users/registrar1`;
    //console.log(user);
    return this.httpService.post<any>(url, user);
  }

  loginUser1(user: any): Observable<string> {
    const url = `${this.apiUrl}/users/login1`;
    //console.log(user);
    return this.httpService.put<string>(url, user, { responseType: 'text' as 'json' });
  }

  obtenerUsuarioPorToken(token: string): Observable<any> {
    //console.log('Token:', token);
    const url = `${this.apiUrl}/users/getListsByUser?token=${token}`;
    return this.httpService.get<any>(url);
  }

  validarEmail(email: string) {
    const url = `${this.apiUrl}/users/validateEmail`;
    return this.httpService.post<boolean>(url, { email });
  }
  

  recoverPassword(user: any) {
    const url = `${this.apiUrl}/users/recoverPassword`;
    //console.log(user);
    return this.httpService.post<any>(url, user);
  }


  changePassword(token: string, newPassword: string) {
    const payload = { token, newPassword };
    //console.log(payload);  // Deberías ver solo la cadena del token aquí
    return this.httpService.post<any>(`${this.apiUrl}/users/changePassword`, payload);
  }

  establecerPremium(email: string) {
    const url = `${this.apiUrl}/users/setPremium`;
    return this.httpService.post<any>(url, email );
  }
  
}
