import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth-service.service'; // Ajuste o caminho conforme necessário

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Recupera o token armazenado
    console.log('Intercepting request...', request.url);
    if (token) {
      console.log('Token found:', token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.warn('No token found!');
    }

    return next.handle(request).pipe(tap(
      event => {
        if(event instanceof HttpResponse){
          console.log('Request sucessful:' , event)
        }
      }, 
      error => {
        console.error('Request failed:' , error);
      }
    )); // Prossegue com a requisição modificada
  }
}
