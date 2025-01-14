import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path: string = `${environment.API_PATH}/account`;
  TOKEN_NAME: string = environment.TOKEN_NAME;

  constructor(private http: HttpClient,private router: Router) { }

  login(account: Account): Observable<any> {
    return this.http.post(`${this.path}/login`, account);
  }

  create(account: Account): Observable<any> {
    return this.http.post(`${this.path}/create`, account);
  }

  update(account: Account): Observable<any> {
    return this.http.put(`${this.path}/update`, account);
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);    
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  verify(): Observable<any> {
    return this.http.get(`${this.path}/verify`);
  }

  isAuthenticated(): Observable<boolean> {
    const observable = new Observable<boolean>((subs) => {
      this.verify().subscribe({
        next: (value) => {
          subs.next(value.status);
          if(!value.status){
            this.router.navigate(['/login']);
          }
        },
      });
    });
    return observable;
  }

}

