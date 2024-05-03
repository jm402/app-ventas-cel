import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
  private currentUser: any;
  
  private authService = inject(AuthService);
  //private userService = inject(UsuariosService);

  ngOnInit(): void {
    // this.userService.getPerfilUsuario(this.authService.getUserEmail()).subscribe((user) => {
    //   this.currentUser = user;
    // })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn() != null;
  }

  getName(): string {
    return this.authService.getName() ? this.authService.getName() : '';
  }

  getUserEmail1() {
    return this.authService.getUserEmail() ? this.authService.getUserEmail() : '';
  }
}
