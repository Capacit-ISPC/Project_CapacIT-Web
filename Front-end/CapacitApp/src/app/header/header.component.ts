import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
//import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  brand : String = "CapacIT";

  constructor(private router: Router){

  }

  ngOnInit(): void {
    
  }

  redirectLogin() {
    this.router.navigate(['/login'])
   
  }

  logout(){
   
  }
}



