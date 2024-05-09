import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm!: FormGroup;

  constructor(private FormBuilder: FormBuilder) {}

  ngOnInit() {
    this.createContactForm();
  }
  createContactForm() {
    this.contactForm = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactMethod: ['', Validators.required], // Agregado el control para el método de contacto
      phoneType: [''], // Control adicional para el tipo de teléfono
      phone: [''], // Control adicional para el número de teléfono
      availability: [''], // Control adicional para el horario disponible
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // pendiente para  enviar los datos del formulario
      console.log(this.contactForm.value);
      // Lógica para enviar el formulario
    } else {
      // pendiente para el caso en el que el formulario no sea válido
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
