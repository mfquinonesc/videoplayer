import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clone = request;

    clone = request.clone({
      setHeaders: {
        Authorization: this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : 'Not Found'
      }
    });

    return next.handle(clone);
  } 
}
