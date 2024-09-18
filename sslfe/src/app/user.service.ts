import { ApplicationModule, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://alarcos.esi.uclm.es/fakeAccountsBE'

  constructor(private httpService:HttpClient) { }

  registerUser1(user: any){
 
    const url = this.apiUrl + '/users/registrar1';
    return this.httpService.post<any>(this.apiUrl + url, user);
  }

  loginUser(user: any){
    const url = this.apiUrl + '/users/login';
    return this.httpService.post<any>(this.apiUrl + url, user);
  }

}
