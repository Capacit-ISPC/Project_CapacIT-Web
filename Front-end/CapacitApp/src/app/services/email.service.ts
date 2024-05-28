import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() { }

  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      'service_cqhe26b',     // Reemplaza con tu Service ID
      'template_xif0i2d',    // Reemplaza con tu Template ID
      formData,
      'tISn31PmaeLiqwG4w'         // Reemplaza con tu User ID
    );
  }
}
