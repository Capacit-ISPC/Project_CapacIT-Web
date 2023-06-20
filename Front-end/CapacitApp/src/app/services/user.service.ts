import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Models/User";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = 'http://127.0.0.1:8000/api/capacit/'

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  registrarUsuario(user: User): Observable<any> {
    return this.http.post(this.url + "create/", user);
  }

  logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log("Logout exitoso");
    alert("Se ha cerrado la sesión correctamente");
    this.router.navigate(['/home']); 
  }
}
