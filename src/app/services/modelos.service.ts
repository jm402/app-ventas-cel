import { Injectable, inject } from '@angular/core';
import { ContextService } from './context.service';
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { Modelos } from '../models/modelos.model';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  private _ContextService = inject(ContextService);

  async get() {
    let result: Modelos[] = [];
    const querySnapshot = await getDocs(collection(this._ContextService.db, "modelos"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      let data: Modelos = {
        guid: doc.id,
        nombre: doc.data().nombre,
        isActive: doc.data().isActive,
        marcaId: doc.data().marcaId
      };
      if (data.isActive) {
        result.push(data);
        result = this._ContextService.ordenarArray(result);
      }
    });
    return result;
  }
  async agregarElemento($event: any) {
    await setDoc(doc(this._ContextService.db, "modelos", this._ContextService.generateGUID()), {
      nombre: $event.data.nombre,
      isActive: true,
      marcaId: $event.data.marcaId
    });
    //console.debug("Document written with ID: ", this.generateGUID());
  }

  async actualizarElemento($event: any) {
    const marcaRef = doc(this._ContextService.db, "modelos",  $event.oldData.guid);
    await updateDoc(marcaRef, {
      nombre: ($event.newData.nombre != undefined)? $event.newData.nombre: $event.oldData.nombre,
      marcaId: ($event.newData.marcaId != undefined)? $event.newData.marcaId: $event.oldData.marcaId,
    });
    //console.debug("Document written with ID: ", this.generateGUID());
  }

  async eliminarElemento($event: any) {
    const marcaRef = doc(this._ContextService.db, "modelos",  $event.data.guid);
    await updateDoc(marcaRef, {
      isActive: false
    });
  }
}
