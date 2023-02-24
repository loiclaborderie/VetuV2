import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
    console.log('happened now');
  }
  isLogged(): boolean {
    const token: string | null = localStorage.getItem('token');
    return !!token;
  }
  clearToken(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken(): null | string {
    return localStorage.getItem('token');
  }

  constructor(private router: Router) {}
}
