import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarcaModelo, Ventas } from '../../models/ventas.model';
import { Marcas } from '../../models/marcas.model';
import { Modelos } from '../../models/modelos.model';
import { MarcasService } from '../../services/marcas.service';
import { ModelosService } from '../../services/modelos.service';
import { VentasService } from '../../services/ventas.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  public dataSource:                    Ventas[];
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
  modelosList:                          Modelos[] = []; 
  marcasList:                           Marcas[] = [];
  marcaModeloList:                      MarcaModelo[] = [];

  private _service = inject(VentasService);
  private _MarcasService = inject(MarcasService);
  private _ModelosService = inject(ModelosService);
  private _alertService = inject(AlertService);

  constructor() {
    this.getData();
  }

  async getData() {
    this.dataSource = await this._service.get();
    this.getModelos();
  }
  
  async getModelos() {
    this.modelosList = await this._ModelosService.get();
    this.getMarcas();
  }

  async getMarcas() {
    this.marcasList = await this._MarcasService.get();
    this.getMarcaModelos();
  }

  async getMarcaModelos() {
    this.marcaModeloList = [];
    this.modelosList.forEach((model) => {
      this.marcasList.forEach((marca) => {
        if (model.marcaId === marca.guid) {
          this.marcaModeloList.push({
            displayName: `${marca.nombre} - ${model.nombre}`,
            modeloId: model.guid,
            marcaId: marca.guid
          });
        }
      });
    });
    // console.log(JSON.stringify(this.modelosList));    
    // console.log(JSON.stringify(this.marcasList));    
    // console.log(JSON.stringify(this.marcaModeloList));    
  }

  async agregarElemento($event: any) {
    let isComplete = this.isComplete($event.data);
    let isExist = this.isExist(this.dataSource,$event.data);
    if (isComplete === true && isExist === false) {
      await this._service.agregarElemento($event);
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

  async actualizarElemento($event: any) {
    let isComplete = this.isComplete($event.data);
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

  isExist(dataSource: Ventas[], data: Ventas) {
    let isExist = false;
    try {
      //console.log(`${JSON.stringify(dataSource)}`);
      if (dataSource.length > 0) {  
        dataSource.forEach((item) => {
          if (item.imei.toLowerCase() === data.imei.toLowerCase() || item.numero.toLowerCase() === data.numero.toLowerCase()) {
            isExist = true;
          }
        });
      }
    } catch (error) {
      return false;  
    }
    return isExist;
  }
  
  isComplete(data: Ventas) {
    try {
      if (data.imei === undefined || data.imei === '') {
        return false;
      }
      if (data.numero === undefined || data.numero === '') {
        return false;
      }
      if (data.modeloId === undefined || data.modeloId === '') {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }
}