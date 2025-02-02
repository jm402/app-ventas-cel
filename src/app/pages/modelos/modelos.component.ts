import { Component, ElementRef, ViewChild, inject, model } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Modelos } from '../../models/modelos.model';
import { ModelosService } from '../../services/modelos.service';
import { MarcasService } from '../../services/marcas.service';
import { Marcas } from '../../models/marcas.model';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.scss'
})
export class ModelosComponent {
  public dataSource:                    Modelos[];
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
  marcasList:                           Marcas[] = [];

  private _service = inject(ModelosService);
  private _MarcasService = inject(MarcasService);
  private _alertService = inject(AlertService);

  constructor() {
    this.getData();
  }

  async getData() {
    this.dataSource = await this._service.get();
    this.getMarcas();
  }

  async getMarcas() {
    this.marcasList = await this._MarcasService.get();
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
    let isExist = this.isExist(this.dataSource,$event.data);
    if (isComplete === true && isExist === false) {
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

  isExist(dataSource: Modelos[], data: Modelos) {
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
  
  isComplete(data: Modelos) {
    try {
      if (data.nombre === undefined || data.nombre === '' || data.nombre === null) {
        return false;
      }
      if (data.marcaId === undefined || data.marcaId === '' || data.marcaId === null) {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }
  
  isCompleteUpdate($event: any) {
    //console.log($event);
    let modelo: Modelos = {
      nombre: '',
      marcaId: '',
      guid: '',
      isActive: false
    };
    modelo.nombre = ($event.newData.nombre != undefined)? $event.newData.nombre: $event.oldData.nombre;
    modelo.marcaId = ($event.newData.marcaId != undefined)? $event.newData.marcaId: $event.oldData.marcaId;
    //console.log(modelo);
    try {
      if (modelo.nombre === undefined || modelo.nombre === '') {
        return false;
      }
      if (modelo.marcaId === undefined || modelo.marcaId === '') {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }
}