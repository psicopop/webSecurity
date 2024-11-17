import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8080/user'; // Altere para o endpoint correto do backend
  isAutenticado: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setAuthState(response.token);
          this.isAutenticado = true;
          this.isAdmin = response.roles.includes('ADM');
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('authStatus') || 'false');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAutenticado = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  private setAuthState(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdminRole(): boolean {
    return this.isAdmin;
  }
}
