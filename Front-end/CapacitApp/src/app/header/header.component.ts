import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  brand : String = "CapacIT";

  constructor(public auth: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated =>{
      if (isAuthenticated) {
        this.router.navigate(['/course'])
      }
    })
  }

  login() {
    this.auth.loginWithRedirect()
  }

  logout(){
    this.auth.logout()
  }
}



