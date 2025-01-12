import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/utilities/message';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent extends Message {

  isLoading: boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]]
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    super();
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  submit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      let info = this.loginForm.value as Account;
      this.authService.login(info).subscribe({
        next:(value)=>{
          if(value.status){
            this.authService.saveToken(value.token);
            this.router.navigateByUrl('/admin');
          }else{
            this.showMessage('El correo o la contraseña son incorrectos','Error');
          }
        },
        complete:()=> {
          this.isLoading = false;
        },
      });
    }
    else {
      this.openDialog('Se produjo un error', 'Mensaje');
    }
  }
}
