import { Injectable } from '@angular/core';
import { ContactFormComponent } from './../contact-form/contact-form.component';
import {  HttpClient } from '@angular/common/http'; // Importar HttpClient
import { catchError, throwError } from 'rxjs'; // Importar catchError y throwError



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  submitContactForm(data: any) {
    return this.http.post('../ContactFormComponent', data) 
      .pipe(
        catchError(error => {
          console.error('Error al enviar consulta:', error);
          return throwError(error); // Propagar el error
        })
      )
      .subscribe(response => {
        console.log('Consulta enviada:', response);
      });
  }
}
