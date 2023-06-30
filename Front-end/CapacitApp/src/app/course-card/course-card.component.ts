import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Course } from '../Models/Course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})


export class CourseCardComponent implements OnInit {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  @Input() course!: Course;
  precio:number = 20;
  constructor() {

  }

  ngOnInit(): void {
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.precio.toString(),
              currency_code: 'USD'
            }
          }]
        })
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log(details); //Esto se debe modificar para que si el status es COMPLETED redireccione a pagina de confirmacion de compra

        });
      },
      onError:(error: any) =>{
        console.log(error);
      }
    }
    ).render(this.paymentRef.nativeElement);

  }

}
