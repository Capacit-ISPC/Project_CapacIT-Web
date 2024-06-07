import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { Course } from '../Models/Course';
import { Category } from '../Models/Category';
import { Tutor } from '../Models/Tutor';
import { User } from '../Models/User';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = [];
  tutors: Tutor[] = [];
  newCourse: Course = this.initializeCourse();
  showCourseList: Boolean = false;
  isModalOpen: boolean = false;
  isStaff: boolean = false;  // Variable para verificar si el usuario es staff

  constructor(private courseService: CourseService, private authService: AuthService) {}

  ngOnInit() {
    this.getAllCategories();
    this.getAllTutors();
    this.checkIsStaff();
  }

  checkIsStaff() {
    const usuarioId = this.authService.getUsuarioId();
    if (usuarioId) {
      this.authService.getUsuarioActualDesdeServidor(usuarioId).subscribe({
        next: (usuario: User) => {
          this.isStaff = usuario.is_staff;
          console.log("Estado de staff en cursos: " + this.isStaff);
        },
        error: (error) => {
          this.isStaff = false;  // En caso de error, asegúrate de que isStaff sea false
          console.error("Error obteniendo el usuario", error);
        }
      });
    } else {
      this.isStaff = false;  // Si no hay usuario logueado, isStaff debería ser false
      console.log("No hay usuario logueado");
    }
  }

  getAllCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        this.handleError("Debe estar logueado para ver los cursos", error);
      }
    });
  }

  getAllCategories() {
    this.courseService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.handleError("Error al cargar las categorías", error);
      }
    });
  }

  getAllTutors() {
    this.courseService.getTutors().subscribe({
      next: (data) => {
        this.tutors = data;
      },
      error: (error) => {
        this.handleError("Error al cargar los tutores", error);
      }
    });
  }

  createCourse() {
    this.newCourse.category = Number(this.newCourse.category);
    this.newCourse.tutor = Number(this.newCourse.tutor);

    if (this.newCourse.id) {
      this.editCourse(this.newCourse.id, this.newCourse);
    } else {
      this.courseService.createCourse(this.newCourse).subscribe({
        next: (data) => {
          console.log("Curso creado exitosamente", data);
          this.newCourse = this.initializeCourse();
          this.getAllCourses();  // Actualiza la lista de cursos automáticamente
          this.closeModal();
        },
        error: (error) => {
          this.handleError("Debe estar logueado para crear un curso", error);
        }
      });
    }
  }

  showCourses() {
    this.showCourseList = !this.showCourseList;
    if (this.showCourseList) {
      this.getAllCourses();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newCourse = this.initializeCourse(); // Reiniciar el formulario al cerrar el modal
  }

  openEditModal(course: Course) {
    this.newCourse = { ...course };
    // Convertir nombres de categoría y tutor a sus respectivos IDs
    const selectedCategory = this.categories.find(cat => cat.tipo === String(course.category));
    if (selectedCategory) {
      this.newCourse.category = selectedCategory.id;
    }

    const selectedTutor = this.tutors.find(tut => `${tut.name} ${tut.last_name}` === String(course.tutor).trim());
    if (selectedTutor) {
      this.newCourse.tutor = selectedTutor.id;
    }
    
    this.openModal();
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== courseId);
        alert("Curso eliminado exitosamente");
      },
      error: (error) => {
        this.handleError("Error al eliminar el curso", error);
      }
    });
  }

  editCourse(courseId: number, updatedCourse: Course) {
    this.courseService.updateCourse(courseId, updatedCourse).subscribe({
      next: (data) => {
        const index = this.courses.findIndex(course => course.id === courseId);
        if (index !== -1) {
          this.courses[index] = data;
        }
        alert("Curso actualizado exitosamente");
        this.getAllCourses();  // Actualiza la lista de cursos automáticamente después de editar
        this.closeModal();
      },
      error: (error) => {
        this.handleError("Error al actualizar el curso", error);
      }
    });
  }

  private initializeCourse(): Course {
    return {
      id: 0,
      name: '',
      description: '',
      language: '',
      technology: '',
      level: '',
      price: 0.0,
      link: '',
      category: 0,
      tutor: 0
    };
  }

  private handleError(message: string, error: any) {
    alert(message);
    console.error(message, error);
  }
}
