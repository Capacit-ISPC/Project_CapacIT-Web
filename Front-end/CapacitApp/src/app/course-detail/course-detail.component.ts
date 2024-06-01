
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service'; // Importo el servicio para obtener detalles del curso
import { Observable } from 'rxjs';

import { Course } from '../Models/Course';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courseId!: number;
  course!: Course;

  constructor(
      private route: ActivatedRoute,
      private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
        this.courseId = +idParam;
        this.getCourseDetails(this.courseId).subscribe((course: Course) => {
            this.course = course;
        });
    } else {
        // Manejar el caso cuando no se proporciona un ID en la URL
        console.error('No se proporcionó un ID en la URL.');
    }
}



getCourseDetails(courseId: number): Observable<Course> {
  return this.courseService.findCourseById(courseId);
}

}