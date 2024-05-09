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


}
