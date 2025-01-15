import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  login: any = {};

  constructor(private authService: AuthService) {
    this.login = this.authService.getLogin();
    if (this.login != null) {
      this.login.name = this.login.name ? this.login.name.toUpperCase() : '';
      this.login.email = this.login.email ? this.login.email.toLowerCase() : '';
    }
  }

}
