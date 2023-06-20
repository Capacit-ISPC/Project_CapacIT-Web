import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  brand : String = "CapacIT";

  constructor(private router: Router, private userService: UserService){

  }

  ngOnInit(): void {
    
  }

  redirectLogin() {
    this.router.navigate(['/login'])
   
  }

  logout(){
   this.userService.logout();
   
  }
}



