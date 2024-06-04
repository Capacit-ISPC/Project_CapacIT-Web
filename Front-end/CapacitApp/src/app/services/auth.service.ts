import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Perfil } from '../Models/Perfil';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';
  private usuarioActual: any;
  private url:string = 'http://127.0.0.1:8000/'

  constructor(private http:HttpClient, private router: Router){}

  login(email: string, password: string): Observable<any> {//se logue
    const user = {
      email: email,
      password: password
    };
    console.log("Token en servicio auth: " + this.getToken())
    return this.http.post(`${this.url}/login/`, user);
  }

  setToken(token: string) {//guarda el token obtenido acá
    this.token = token;
    localStorage.setItem('token',token)//guardo en el localStorage
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token') || ''; // Obtiene el token del almacenamiento local
    }
    return this.token;
  }
  
  setUsuarioActual(usuario: { id: number, name: string, email: string, last_name: string }) {
    this.usuarioActual = usuario;
    localStorage.setItem('usuarioActual', JSON.stringify(usuario)); // Almacena el usuario actual en el almacenamiento local
  }

  getUsuarioActual() {
    if (!this.usuarioActual) {
      this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}'); // Obtiene el usuario actual del almacenamiento local
    }
    return this.usuarioActual;
  }
  getUsuarioId(): number | null {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    return usuarioActual ? usuarioActual.id : null;
  }
  

  getUsuarioActualDesdeServidor(usuarioId: number): Observable<Perfil> {
    const url = `http://127.0.0.1:8000/users/${usuarioId}`;
    return this.http.get<Perfil>(url);
  }
  


  isLoggedIn() {
    return !!this.getToken(); // Verifica si hay un token almacenado y devuelve true si está presente
  }


  deleteCookie(name: string) {
    console.log("borrado de la cookie")
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.token='';
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local al cerrar sesión
    this.token = ''; // Resetea el token en el servicio
    this.router.navigate(['/home']); // Redirige al usuario a la página de inicio
    this.deleteCookie('token');
    console.log("Logout exitoso");
    alert("Se ha cerrado la sesión correctamente");
    this.router.navigate(['/home']); 

    console.log("token despues del logout: " + this.getToken())
  }
}
