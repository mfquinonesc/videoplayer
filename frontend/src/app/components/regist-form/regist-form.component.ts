import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from 'src/app/utilities/message';

@Component({
  selector: 'app-regist-form',
  templateUrl: './regist-form.component.html',
  styleUrls: ['./regist-form.component.css']
})
export class RegistFormComponent extends Message {

  registForm = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    isAdmin: [false]
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  get name() {
    return this.registForm.controls.name;
  }

  get lastname() {
    return this.registForm.controls.lastname;
  }

  get email() {
    return this.registForm.controls.email;
  }

  get password() {
    return this.registForm.controls.password;
  }

  get confirmPassword() {
    return this.registForm.controls.confirmPassword;
  }

  get isAdmin() {
    return this.registForm.controls.isAdmin;
  }

  submit() {
    if (this.registForm.valid) {

    } else {
      this.openDialog('','Mensaje')
    }
  }
}
