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
  showCourseList: Boolean = false;
  showCourseForm: Boolean = false;

  constructor(private courseService: CourseService) {

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

    this.newCourse.technology = 'default';
    this.newCourse.level = 'default';
    this.newCourse.description='default'
    
    this.courseService.createCourse(this.newCourse)
      .subscribe({
        next: (data) => {
          console.log("Curso creado exitosamente", data)
          this.newCourse = data;
          this.courses.push(this.newCourse)
        },
        error: (error) => {
          alert("Debe estar logueado para crear un curso")
          console.log("Error al creal el curso", error)
          
        }
      })
  }

  showCourses() {
    this.showCourseList = !this.showCourseList;
    this.getAllCourses()
  }

  showForm() {
    this.showCourseForm = true;
  }

  hideForm() {
    this.showCourseForm = false;
  }

  showCreateForm() {

  }

  deleteCourses() {

  }

  editCourses() {

  }
}
