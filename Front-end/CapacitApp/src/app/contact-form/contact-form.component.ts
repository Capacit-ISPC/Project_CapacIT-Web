import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private FormBuilder: FormBuilder, private emailService: EmailService) {}

  ngOnInit() {
    this.createContactForm();
  }
  createContactForm() {
    this.contactForm = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactMethod: ['', Validators.required], // Agregado el control para el método de contacto
      phone: [''], // Control adicional para el número de teléfono
      availability: [''], // Control adicional para el horario disponible
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.emailService.sendEmail(this.contactForm.value).then(
        response => {
          console.log('Correo enviado', response);
          alert('Correo enviado con éxito');
        },
        error => {
          console.error('Error enviando correo', error);
          alert('Hubo un error al enviar el correo');
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  onChangeContactMethod() {
    const contactMethodValue = this.contactForm.get('contactMethod')?.value;
    if (contactMethodValue === 'phone') {
      // Si el método de contacto es teléfono, establecer los controles adicionales como obligatorios
      this.contactForm.get('phoneType')?.setValidators(Validators.required);
      this.contactForm.get('phone')?.setValidators(Validators.required);
      this.contactForm.get('availability')?.setValidators(Validators.required);
    } else {
      // Si el método de contacto no es teléfono, limpiar las validaciones de los controles adicionales
      this.contactForm.get('phoneType')?.clearValidators();
      this.contactForm.get('phone')?.clearValidators();
      this.contactForm.get('availability')?.clearValidators();
    }
    // Actualizar las validaciones
    this.contactForm.get('phoneType')?.updateValueAndValidity();
    this.contactForm.get('phone')?.updateValueAndValidity();
    this.contactForm.get('availability')?.updateValueAndValidity();
  }

}
