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
      
  convertFirebaseTimestampToDate(timestamp: any) {
    // Ensure timestamp is a Firebase Timestamp object
    if (!timestamp.seconds) {
      throw new Error('Invalid Firebase Timestamp object');
    }
  
    // Extract seconds and nanoseconds from the timestamp
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
  
    // Convert to milliseconds (seconds * 1000 + nanoseconds / 1000000)
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  
    // Create a new Date object from the milliseconds
    const date = new Date(milliseconds);
  
    // Format the date according to your desired format (optional)
    const formattedDate = date.toLocaleDateString(); // Example format
  
    return formattedDate;
  }
}
