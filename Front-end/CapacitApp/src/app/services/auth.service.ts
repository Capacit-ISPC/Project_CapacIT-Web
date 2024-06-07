import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';
  private usuarioActual: User | null = null;
  private url: string = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const user = { email: email, password: password };
    return this.http.post(`${this.url}/login/`, user);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token') || '';
    }
    return this.token;
  }
  
  setUsuarioActual(usuario: User) {
    this.usuarioActual = usuario;
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  getUsuarioActual(): User | null {
    if (!this.usuarioActual) {
      const storedUser = localStorage.getItem('usuarioActual');
      console.log("Usuario stored: " + storedUser)
      if (storedUser) {
        this.usuarioActual = JSON.parse(storedUser);
      } else {
        this.usuarioActual = null;
      }
    }
    return this.usuarioActual;
  }

  getUsuarioId(): number | null {
    const usuarioActual = this.getUsuarioActual();
    console.log("Usuario actual: " + usuarioActual)
    return usuarioActual ? usuarioActual.id : null;
  }

  getUsuarioActualDesdeServidor(usuarioId: number): Observable<User> {
    const url = `${this.url}users/${usuarioId}`;
    return this.http.get<User>(url);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioActual');
    this.token = '';
    this.usuarioActual = null;
    this.deleteCookie('token');
    this.router.navigate(['/home']);
    alert("Se ha cerrado la sesión correctamente");
  }
}
