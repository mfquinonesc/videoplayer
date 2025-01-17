import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/utilities/message';

@Component({
  selector: 'app-regist-form',
  templateUrl: './regist-form.component.html',
  styleUrls: ['./regist-form.component.css']
})
export class RegistFormComponent extends Message {

  isLoading: boolean = false;

  registForm = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    isAdmin: [false]
  });

  @Output() registEvent = new EventEmitter<boolean>(false);

  constructor(private fb: FormBuilder, private authService: AuthService) {
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

  accept() {
    this.registEvent.emit(true);
  }

  submit() {
    if (this.registForm.valid) {
      this.isLoading = true;
      const account = this.registForm.value as Account;
      this.authService.create(account).subscribe({
        next: (value) => {
          this.showMessage(value.message, "Información");
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
