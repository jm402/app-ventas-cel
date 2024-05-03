import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginDisplay = false;
  user: User;

  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  async login(): Promise<void> {
    try {
      const result = await this.authService.singUpWithGoogle();
      this.user = result.user;
      console.debug(result);
      console.debug(this.user);
      //console.debug(this.authService.authState$);
      
      this.router.navigateByUrl("/home");
    } catch (error) {
      this.alertService.Alert('error','Error',error)
      .then((response: any) => {
      })
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
