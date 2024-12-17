import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';
  private readonly tokenKey = 'accessToken';
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

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.setLocalStorageItem(this.tokenKey, response.token);
          this.isAuth = true;
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        tap((response) => {
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
