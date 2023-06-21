import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';
  private url:string = 'http://127.0.0.1:8000/api/capacit/'

  constructor(private http:HttpClient, private router: Router){}

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  deleteCookie(name: string) {
    console.log("borrado de la cookie")
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.token='';
  }

  isLoggedIn() {
    return !!this.token;
  }

  login(email: string, password: string): Observable<any> {
    const user = {
      email: email,
      password: password
    };
    console.log("Token en servicio auth: "+this.getToken())
    return this.http.post(this.url + "token/",user);
  }

  logout() {
    this.deleteCookie('token');
    console.log("Logout exitoso");
    alert("Se ha cerrado la sesión correctamente");
    this.router.navigate(['/home']); 

    console.log("token despues del logout: " + this.getToken())
  }
}
