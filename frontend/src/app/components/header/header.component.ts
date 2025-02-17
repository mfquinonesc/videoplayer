import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 constructor(private authService:AuthService, private router: Router){
 }


 login(){
  if(this.authService.isLoggedIn()){
    this.authService.logout();
    this.router.navigate(['/']);
  }else{
    this.router.navigate(['/login']);
  }
 }

 get isAdmin ():boolean{
      let login = this.authService.getLogin();
      return (login && login.isAdmin)
 }

}
