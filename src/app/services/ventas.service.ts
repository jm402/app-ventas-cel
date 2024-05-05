import { Injectable, inject } from '@angular/core';
import { ContextService } from './context.service';
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { Ventas } from '../models/ventas.model';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private readonly collection: string = 'ventas';

  private _ContextService = inject(ContextService);
  private _AuthService = inject(AuthService);

  async get() {
    let result: Ventas[] = [];
    const querySnapshot = await getDocs(collection(this._ContextService.db, this.collection));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data().fecha);
      
      const convertedDate = this._ContextService.convertFirebaseTimestampToDate(doc.data().fecha);
      //console.log(convertedDate); // Output: 2024-05-04 (assuming today is May 4, 2024)
      //console.log(this._AuthService.getUid());
      
      let data: Ventas = {
        guid: doc.id,
        modeloId: doc.data().modeloId,
        imei: doc.data().imei,
        numero: doc.data().numero,
        fecha: new Date(convertedDate),
        vendedor: doc.data().vendedor,
        isActive: doc.data().isActive,
      };
      if (data.isActive && data.vendedor === this._AuthService.getUid()) {
        result.push(data);
        result = this._ContextService.ordenarArray(result);
      }
    });
    return result;
  }
  
  async agregarElemento($event: any) {
    await setDoc(doc(this._ContextService.db, this.collection, this._ContextService.generateGUID()), {
      modeloId: $event.data.modeloId,
      imei: $event.data.imei,
      numero: $event.data.numero,
      fecha: ($event.data.fecha != undefined)? $event.data.fecha: new Date(),
      vendedor: this._AuthService.getUid(),
      isActive: true,
    });
    //console.debug("Document written with ID: ", this.generateGUID());
    console.log(new Date());    
  }

  async actualizarElemento($event: any) {
    const itemRef = doc(this._ContextService.db, this.collection,  $event.oldData.guid);
    await updateDoc(itemRef, {
      modeloId: ($event.newData.modeloId != undefined)? $event.newData.modeloId: $event.oldData.modeloId,
      imei: ($event.newData.imei != undefined)? $event.newData.imei: $event.oldData.imei,
      numero: ($event.newData.numero != undefined)? $event.newData.numero: $event.oldData.numero,
      fecha: ($event.newData.fecha != undefined)? $event.newData.fecha: $event.oldData.fecha,
    });
    //console.debug("Document written with ID: ", this.generateGUID());
  }

  async eliminarElemento($event: any) {
    const itemRef = doc(this._ContextService.db, this.collection,  $event.data.guid);
    await updateDoc(itemRef, {
      isActive: false
    });
  }
}