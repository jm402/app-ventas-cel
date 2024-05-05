import { Injectable, inject } from '@angular/core';
import { AlertService } from './alert.service';
import { 
  Auth, 
  UserCredential, 
  authState, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup
} from '@angular/fire/auth';
import { Credentials } from '../../models/credential.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private usuariosService = inject(UsuariosService);
  private alertService = inject(AlertService); // AlertService
  private auth: Auth = inject(Auth);

  readonly authState$ = authState(this.auth);

  singUpWithEmailAndPassword(credentials: Credentials): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password);
  }

  singUpWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  async callPopUp(provider: GoogleAuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (error: any) {
      return error;
    }
  }

  getUid(): any {
    const currentUser = this.auth.currentUser;
    return currentUser!.uid || "";
  }

  getUserEmail() {
    const currentUser = this.auth.currentUser;
    return currentUser!.email || "";
  }

  getName(): any {
    const currentUser = this.auth.currentUser;
    return currentUser!.displayName || "";
  }

  getPhotoProfile(): any {
    const currentUser = this.auth.currentUser;
    return currentUser!.photoURL || "";
  }

  isLoggedIn(): boolean {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      //console.debug('Usuario autenticado:', currentUser);
      return true;
    } else {
      //console.debug('Usuario no autenticado');
      return false;
    }
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
