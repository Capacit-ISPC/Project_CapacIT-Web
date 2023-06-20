import { Component } from '@angular/core';
import { CourseService } from '../services/course.service'
import { Course } from '../Models/Course';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  courses: Course[] = [];
  newCourse: Course = {} as Course;

  constructor(private courseService: CourseService) {

    this.getAllCourses()
  }

  getAllCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        alert("Debe estar logueado para ver los cursos")
        console.log("No se pueden traer los usuarios", error)
      }
    });
  }

  createCourse() {
    this.courseService.createCourse(this.newCourse)
      .subscribe({
        next: (data) => {
          console.log("Curso creado exitosamente", data)
          this.newCourse = data;
          this.courses.push(this.newCourse)
        },
        error: (error) => {
          console.log("Error al creal el curso", error)
        }
      })
  }

}
