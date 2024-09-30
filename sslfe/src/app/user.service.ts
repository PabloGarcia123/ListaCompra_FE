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
  constructor(private httpService:HttpClient) { }

  registerUser1(user: any) {
    const url = `${this.apiUrl}/users/registrar1`;
    console.log(user);
    return this.httpService.post<any>(url, user);
  }

  registerUser2(){

  }

  loginUser1(user: any): Observable<string> {
    const url = `${this.apiUrl}/users/login1`;
    console.log(user);
    // Configura la solicitud para que espere una respuesta de tipo texto
    return this.httpService.put<string>(url, user, { responseType: 'text' as 'json' });
  }
  

  loginUser2(){

  }

  loginUser3(){
  
  }

  getAllUsers(){

  }

  deleteUser(){

  }

  deleteAllUsers(){

  }
  
  recoverPassword(user: any){
    const url = `${this.apiUrl}/users/recoverPassword`;
    console.log(user);
    return this.httpService.post<any>(url, user);
  }


  changePassword(){

  }

  confirmAccount(){

  }

 

}
