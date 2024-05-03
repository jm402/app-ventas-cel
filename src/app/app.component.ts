import { Component, inject } from '@angular/core';

import esMessages from 'devextreme/localization/messages/es.json';
import { locale, loadMessages } from 'devextreme/localization';
import { AuthService } from './shared/services/auth.service';
import { ServiceWorkerService } from './shared/services/service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  private authService = inject(AuthService);

  constructor(
    private serviceWorker: ServiceWorkerService
  ) {
    this.initMessages();
    locale('es');
    //this.serviceWorker.checkForUpdate();
  }

  initMessages() {
    loadMessages(esMessages);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
