import { NuestraAppComponent } from './nuestra-app/nuestra-app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { CursosComponent } from './cursos/cursos.component';
import { RutasComponent } from './rutas/rutas.component';
import { PasswordComponent } from './password/password.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CourseDetailComponent } from './course-detail/course-detail.component'; // Asegúrate de ajustar la ruta correcta





const routes: Routes = [
  {path: '', redirectTo:"/home", pathMatch: "full"},
  {path:'home', component: HomeComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CarritoComponent},
  {path: 'news', component: NoticiasComponent},
  {path: 'course', component: CursosComponent},
  {path: 'routes', component: RutasComponent},
  {path: 'password', component: PasswordComponent},
  {path: 'Contacto y Asistencia', component: ContactFormComponent},
  {path: 'About us', component:AboutUsComponent},
  {path: 'courses/:id', component:CourseDetailComponent},
  {path: 'Nuestra App', component:NuestraAppComponent},
  {path: '**', component: PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
