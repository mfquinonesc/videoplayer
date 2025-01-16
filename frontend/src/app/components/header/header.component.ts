import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {
  }


  login() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();      
    } 
    this.router.navigate(['']);
  }

  get isAdmin() {
    let info = this.authService.getLogin();
    return info ? info.isAdmin as boolean : false;
  }

  get isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
