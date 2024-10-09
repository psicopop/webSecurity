import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthServiceService} from "../../service/auth-service.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService) {}

  onLogin(): void {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.errorMessage = 'Nome de usuário ou senha inválidos.';
    }
  }
}
