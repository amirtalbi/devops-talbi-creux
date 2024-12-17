import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://api.example.com';
  private readonly tokenKey = 'authToken';
  public isAuth = false;

  constructor(private readonly http: HttpClient, private router: Router) {
    const token = this.getLocalStorageItem(this.tokenKey);
    this.isAuth = !!token;
  }

  private getLocalStorageItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: AuthResponse) => {
          this.setLocalStorageItem(this.tokenKey, response.token);
          this.isAuth = true;
        })
      );
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        tap((response: AuthResponse) => {
          this.setLocalStorageItem(this.tokenKey, response.token);
          this.isAuth = true;
        })
      );
  }

  logout(): void {
    this.removeLocalStorageItem(this.tokenKey);
    this.isAuth = false;
    this.router.navigate(['/login']);
  }
}
