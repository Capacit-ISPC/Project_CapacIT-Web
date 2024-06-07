import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Course } from "../Models/Course"
import { Category } from '../Models/Category';
import { Tutor } from '../Models/Tutor';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url:string = 'http://127.0.0.1:8000/courses/'
  private categoryUrl = 'http://localhost:8000/category/';
  private tutorUrl = 'http://localhost:8000/tutor/';

  constructor(private httpClient: HttpClient, private authService: AuthService) {

  }


  getCourses(): Observable<Course[]> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    });

    return this.httpClient.get<Course []>(`${this.url}`, { headers });
  }

  createCourse(newCourse: Course){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    });
    return this.httpClient.post<Course>(`${this.url}`, newCourse,{ headers })
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.url +courseId}`);
}

updateCourse(courseId: number, updatedCourse: Course): Observable<Course> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `token ${token}`
  });
  return this.httpClient.put<Course>(`${this.url}${courseId}/`, updatedCourse, { headers });
}

deleteCourse(courseId: number): Observable<void> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `token ${token}`
  });
  return this.httpClient.delete<void>(`${this.url}${courseId}/`, { headers });
}

getCategories(): Observable<Category[]> {
  return this.httpClient.get<Category[]>(this.categoryUrl);
}

getTutors(): Observable<Tutor[]> {
  return this.httpClient.get<Tutor[]>(this.tutorUrl);
}
}
