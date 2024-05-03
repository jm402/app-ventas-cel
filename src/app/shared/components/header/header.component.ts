import { Component, OnInit, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userPhotoUrl: SafeUrl; 

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.userPhotoUrl = 'assets/images/foto-perfil-logout.png';
  }
  
  ngOnInit(): void {
    //this.getdata();
  }

  ngDoCheck() {
    console.debug(`ngDoCheck ${this.userPhotoUrl}`);
    this.getdata();
  }
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn() != false;
  }

  getdata(): any {
    if (this.isLoggedIn()) {
      this.userPhotoUrl = this.authService.getPhotoProfile();
      console.debug(`userPhotoUrl ${this.userPhotoUrl}`);
    }
  }

  logout() {
    this.authService.logout();
    this.userPhotoUrl = 'assets/images/foto-perfil-logout.png';
    this.refreshData();
  }

  refreshData() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/current-route'); // Replace with your actual route
    });
  }
}
