import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Marcas } from '../../models/marcas.model';
import { MarcasService } from '../../services/marcas.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent {
  public dataSource:                    Marcas[];
  public formModal:                     FormGroup;
  @ViewChild('ModalConcepto') Modal:    ElementRef<any>;
  public Title:                         any='';
  public btn:                           any='';
  readonly allowedPageSizes:            number[] = [10, 20, 50];
  displayMode:                          any = 'full';
  showPageSizeSelector:                 boolean = true;
  showInfo:                             boolean = true;
  showNavButtons:                       boolean = true;
  isUpdating:                           boolean = false;
  info:                                 any = 'Sin información'
  submitted:                            boolean= false;

  private _service = inject(MarcasService);
  private _alertService = inject(AlertService);

  constructor() {
    this.getData();
  }

  async getData() {
    this.dataSource = [];
    this.dataSource = await this._service.get();
  }

  async agregarElemento($event: any) {
    let isComplete = this.isComplete($event.data);
    let isExist = this.isExist(this.dataSource,$event.data);
    if (isComplete === true && isExist === false) {
      await this._service.agregarElemento($event);
      //console.debug("Document written with ID: ", this.generateGUID())
      this.getData();
    }
    else {
      this._alertService.Alert('error','Error','El elemento esta incompleto o ya existe')
        .then((response) => {
          this.getData();
        });
    }
  }

  async actualizarElemento($event: any) {
    let isComplete = this.isCompleteUpdate($event);
    //let isExist = this.isExist(this.dataSource,$event.data);
    if (isComplete === true) {// && isExist === false) {
      await this._service.actualizarElemento($event);
      //console.debug("Document written with ID: ", this.generateGUID());
      this.getData();
    }
    else {
      this._alertService.Alert('error','Error','El elemento esta incompleto o ya existe')
        .then((response) => {
          this.getData();
        });
    }
  }

  async eliminarElemento($event: any) {
    await this._service.eliminarElemento($event);
    this.getData();
  }

  isExist(dataSource: Marcas[], data: Marcas) {
    let isExist = false;
    try {
      //console.log(`${JSON.stringify(dataSource)}`);
      if (dataSource.length > 0) {  
        dataSource.forEach((item) => {
          //console.log('forEach:',item.nombre);
          if (item.nombre.toLowerCase() === data.nombre.toLowerCase()) {
            //console.log('nombre:',item.nombre);
            isExist = true;
          }
        });
      }
    } catch (error) {
      return false;  
    }
    return isExist;
  }

  isComplete(data: Marcas) {
    try {
      if (data.nombre === undefined || data.nombre === '') {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }
  
  isCompleteUpdate($event: any) {
    try {
      if (($event.newData.nombre != undefined)? $event.newData.nombre: $event.oldData.nombre === undefined || ($event.newData.nombre != undefined)? $event.newData.nombre: $event.oldData.nombre === '') {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }
}