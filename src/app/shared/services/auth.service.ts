import { Injectable, inject } from '@angular/core';
import { AuthenticationResult, EventType } from '@azure/msal-browser';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private usuariosService = inject(UsuariosService);
  private alertService = inject(AlertService); // AlertService

  constructor() {
    this.init();
  }

  ngOnInit() {
  }

  init() {
  }

  getUserEmail() {
    let userEmail: string = '';
    return userEmail;
  }

  getActiveAccount() {
    return null;
  }

  getAllAccounts() {
    return null;
  }

  getName(): any {
    return null;
  }

  isLoggedIn(): boolean {
    return false;
  }

  login() {
  }

  validateSesion() {
  }

  logout() {
  }

  getPerfilUsuario(email: string) {
  }
}
