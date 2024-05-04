import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { collection, getDocs, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { Marcas } from '../../models/marcas.model';
import { MarcasService } from '../../services/marcas.service';

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

  private _service = inject(MarcasService);

  constructor() {
    this.getData();
  }

  async getData() {
    this.dataSource = await this._service.get();
  }

  generateGUID(): string {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`;
  }

  async agregarElemento($event: any) {
    await this._service.agregarElemento($event);
    //console.debug("Document written with ID: ", this.generateGUID());
    this.getData();
  }

  async actualizarElemento($event: any) {
    await this._service.actualizarElemento($event);
    //console.debug("Document written with ID: ", this.generateGUID());
    this.getData();
  }

  async eliminarElemento($event: any) {
    await this._service.eliminarElemento($event);
    this.getData();
  }
}
