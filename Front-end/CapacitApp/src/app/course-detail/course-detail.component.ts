import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Course } from '../Models/Course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courseId!: number;
  course!: Course;
  currentChapter: string = 'Capítulo 1: Introducción';
  videoUrl: SafeResourceUrl = ''; // Define videoUrl como SafeResourceUrl

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.courseId = +idParam;
      this.getCourseDetails(this.courseId).subscribe((course: Course) => {
        this.course = course;
        this.loadVideo('eS0Q511qNgg'); // Cargar el primer video por defecto
      });
    } else {
      console.error('No se proporcionó un ID en la URL.');
    }
  }

  getCourseDetails(courseId: number): Observable<Course> {
    return this.courseService.findCourseById(courseId);
  }

  loadVideo(videoId: string) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    this.currentChapter = this.getChapterTitle(videoId); // Usar el título del capítulo basado en el ID del video
  }

  getChapterTitle(videoId: string): string {
    switch (videoId) {
      case 'eS0Q511qNgg':
        return 'Capítulo 1: Introducción';
      case 'NbhlGfQLaKI':
        return 'Capítulo 2: Fundamentos';
      case 'video_id_3':
        return 'Capítulo 3: Práctica';
      default:
        return 'Capítulo seleccionado';
    }
  }
}
