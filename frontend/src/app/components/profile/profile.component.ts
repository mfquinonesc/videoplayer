import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  @Input() isSearch:boolean = true; 
  @Input() isPlayer:boolean = false; 
  @Input() isAdding:boolean = true; 

  @Output() clickEvent = new EventEmitter<boolean>(false);
  @Output() searchEvent = new EventEmitter<string>(false);

  login: any = {};
  searchText: string = '';


  constructor(private authService: AuthService) {
    this.login = this.authService.getLogin();
    if (this.login != null) {
      this.login.name = this.login.name ? this.login.name.toUpperCase() : '';
      this.login.email = this.login.email ? this.login.email.toLowerCase() : '';
    }
  }

  add() {
    this.clickEvent.emit(true);
  }

  search() {
    this.searchEvent.emit(this.searchText);
  }

}
