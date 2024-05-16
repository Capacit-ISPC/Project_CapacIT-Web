import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService){

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}