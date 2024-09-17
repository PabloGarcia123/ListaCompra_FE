import { ApplicationModule, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://alarcos.esi.uclm.es/fakeAccountsBE'

  constructor(private httpService:HttpClient) { }

  registerUser1(email: string, pwd1 : String, pwd2: string){
    let user = {
      email : email,
      pwd1 : pwd1,
      pwd2 : pwd2
    }
    const url = this.apiUrl + '/users/registrar1';
    return this.httpService.post<any>(this.apiUrl + url, user);
  }

}
