import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isNavbarActive: boolean = false;

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  @HostListener('window:focusin', ['$event'])
  onFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && target.closest('.navbar')) {
      this.isNavbarActive = true;
    }
  }

  @HostListener('window:focusout', ['$event'])
  onBlur(event: FocusEvent): void {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (!activeElement || !activeElement.closest('.navbar')) {
        this.isNavbarActive = false;
      }
    }, 0);
  }
}
