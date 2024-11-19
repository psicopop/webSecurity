import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login(): void {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        
        localStorage.setItem('token', response.token); // Armazena o token retornado pelo backend
        localStorage.setItem('authStatus', JSON.stringify(true));
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard
      },
      error: (err) => {
        this.errorMessage = "Usuário ou senha inválidos. Tente novamente.";
        console.error(err);
      }
    });
  }
}
