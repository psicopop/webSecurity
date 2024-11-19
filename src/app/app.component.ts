import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthInterceptor } from './interceptors/jwt.interceptor';
import { routes } from '../app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: AuthInterceptor, useClass: AuthInterceptor }, // Registra o interceptor
    
  ],
})
export class AppComponent {
  title = 'webSecurity';
}
