import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  ordenarArray(array: any[]) {
    const rta = array.sort(function(a, b){
      if(a.nombre < b.nombre) { return -1; }
      if(a.nombre > b.nombre) { return 1; }
      return 0;
    });
    return rta;
  }

  generateGUID(): string {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`;
  }

}
