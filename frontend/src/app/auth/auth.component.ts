import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  avatar = "";
  isRegister = false;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) { 
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isRegister = this.router.url.includes('register');
      });
  }

  validateForm = this.fb.group({
    avatar: this.fb.control(''),
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true)
  });

  submitForm(): void {
    if (this.validateForm.invalid) {
      return;
    }


    if (this.isRegister) {
        const { avatar,username, password } = this.validateForm.value;
        if (avatar && username && password) {
          this.authService.register(
            avatar,
            username,
            password
          ).subscribe({
            next: () => {
              this.router.navigate(['/home']);
            },
            error: (err) => console.error('Erreur de connexion', err),
          });
        }
    } else {
        const { username, password } = this.validateForm.value;
        if (username && password) {
          this.authService.login(
            username,
            password
          ).subscribe({
            next: () => {
              this.router.navigate(['/home']);
            },
            error: (err) => console.error('Erreur de connexion', err),
          });
        }
    }
  }
}
