import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Course } from '../Models/Course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  @Input() course!: Course;
  @Input() isStaff!: boolean;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Course>();

  precio: number = 20;

  constructor() {}

  ngOnInit(): void {
    console.log("Estado de staff en card " + this.isStaff);
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.course.price.toString(),
              currency_code: 'USD'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log(details); //Esto se debe modificar para que si el status es COMPLETED redireccione a pagina de confirmacion de compra
        });
      },
      onError: (error: any) => {
        console.log(error);
      }
    }).render(this.paymentRef.nativeElement);
  }

  deleteCourse(courseId: number) {
    this.delete.emit(courseId);
  }

  editCourse(course: Course) {
    this.edit.emit(course);
  }

}
