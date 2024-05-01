import { Injectable } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import { interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  constructor(
    public serviceWorker: SwUpdate
  ) {
    serviceWorker.versionUpdates.subscribe(evt => {
      console.log(evt);
      switch (evt.type) {

        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          document.location.reload()
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          document.location.reload()
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });

    // if (serviceWorker.isEnabled) {
    //   interval(6 * 60 *60).subscribe(() => serviceWorker.checkForUpdate()
    //   .then(() => {}));
    // }

  }

  public checkForUpdate(): void {

    this.serviceWorker.versionUpdates.subscribe( event => this.promptUser());
  }

  private promptUser(): void {
    console.log('actualizando a la nueva version');
    //Se puede aplicar codicion con alert para notificarle al usuario que se hará un reinicio al portal
    this.serviceWorker.activateUpdate().then(() => document.location.reload());
  }
}
