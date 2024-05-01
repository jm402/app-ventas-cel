import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginDisplay = false;

  private authService = inject(AuthService);

  getName(): string {
    return this.authService.getName() ? this.authService.getName() : '';
  }

  isLoggedIn(): boolean {
    return this.authService.getActiveAccount() != null;
  }

  login() {
    this.authService.login();
  }

  validateSesion() {
    this.authService.validateSesion();
  }

  logout() {
    this.authService.logout();
  }
}
