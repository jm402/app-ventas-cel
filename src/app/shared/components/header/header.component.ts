import { Component, OnInit, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userPhotoUrl: SafeUrl; 
  AccessToken: string;

  private authService = inject(AuthService);

  constructor() {
    this.userPhotoUrl = 'assets/images/foto-perfil-logout.png';
    this.AccessToken = '';
  }
  
  ngOnInit(): void {
    this.getdata();
  }
  
  isLoggedIn(): boolean {
    return this.authService.getActiveAccount() != null;
  }

  getdata(): any {
    // this.msalService
    //   .acquireTokenSilent({ scopes: ['User.Read', 'User.ReadBasic.All'] })
    //   .subscribe((tokenResponse) => {
    //     const apiUrl = 'https://graph.microsoft.com/v1.0/me/photo/$value';
    //     const accessToken = tokenResponse.accessToken;
    //     console.log('===> accessToken ' + tokenResponse.accessToken)
    //     const headers = new HttpHeaders({
    //       Authorization: `Bearer ${accessToken}`,
    //     });
    //     this.http.get(apiUrl, { headers, responseType: 'blob' }).subscribe(
    //       (data) => {
    //         // Convierte la respuesta a una URL segura
    //         const blob = new Blob([data], { type: 'image/jpeg' }); // Cambia el tipo MIME según corresponda
    //         const imageUrl = URL.createObjectURL(blob);
    //         this.userPhotoUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    //       },
    //       (error) => {
    //         console.error('Error al obtener datos:', error);
    //       }
    //     )
    //   },
    //   (err) => {
    //     console.error('===> msalService ERROR ' + err.message);
    //   });
  }

  logout() {
    this.authService.logout();
  }
}
