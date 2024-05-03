import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { environment } from '../../../environments/environments';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

export interface Marcas {
  guid: string;
  nombre: string;
}
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent {
  public dataSource:                    Marcas[];
  public conceptosList:                 any[] = [];
  public formModal:                     FormGroup;
  @ViewChild('ModalConcepto') Modal:    ElementRef<any>;
  public Title:                         any='';
  public btn:                           any='';
  public concepto:                      any = {};
  readonly allowedPageSizes:            number[] = [10, 20, 50];
  displayMode:                          any = 'full';
  showPageSizeSelector:                 boolean = true;
  showInfo:                             boolean = true;
  showNavButtons:                       boolean = true;
  isUpdating:                           boolean = false;
  info:                                 any = 'Sin información'
  submitted:                            boolean= false;

  constructor() {
    this.getData();
  }

  async getData() {
    this.dataSource = [];
    const querySnapshot = await getDocs(collection(db, "marcas"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let data: Marcas = {
        guid: doc.id,
        nombre: doc.data().nombre
      };
      this.dataSource.push(data);
      this.dataSource = this.ordenarArray(this.dataSource);
    });
  }

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

  async agregarElemento($event: any) {
    await setDoc(doc(db, "marcas", this.generateGUID()), {
      nombre: $event.data.nombre
    });
    console.debug("Document written with ID: ", this.generateGUID());
    this.getData();
  }
  async actualizarElemento($event: any) {
    await setDoc(doc(db, "marcas", $event.oldData.guid), {
      nombre: ($event.newData.nombre != undefined)? $event.newData.nombre: $event.oldData.nombre
    });
    console.debug("Document written with ID: ", this.generateGUID());
    this.getData();
  }
  async eliminarElemento($event: any) {
    await deleteDoc(doc(db, "marcas", $event.data.guid));
  }
}
