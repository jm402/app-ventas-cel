import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public ventasList:                    Ventas[];
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
  
  form: FormGroup;

  private _service = inject(VentasService);
  private _MarcasService = inject(MarcasService);
  private _ModelosService = inject(ModelosService);
  private _alertService = inject(AlertService);

  constructor() {
    this.form = new FormGroup({
      initDate: new FormControl('', [
        Validators.required
      ]),
      endDate: new FormControl('', [
        Validators.required
      ]),
    });
    this.ventasList = [];
    this.dataSource = [];
    this.getData();
  }

  async getData() {
    this.ventasList = await this._service.get();
    this.dataSource = this.ventasList;
    this.getModelos();
    this.form.reset();
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
    //let isExist = this.isExist(this.dataSource,$event.data);
    if (isComplete === true) {// && isExist === false) {
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
  
  isCompleteUpdate($event: any) {
    try {
      if (($event.newData.imei != undefined)? $event.newData.imei: $event.oldData.imei === undefined || ($event.newData.imei != undefined)? $event.newData.imei: $event.oldData.imei === '') {
        return false;
      }
      if (($event.newData.numero != undefined)? $event.newData.numero: $event.oldData.numero === undefined || ($event.newData.numero != undefined)? $event.newData.numero: $event.oldData.numero === '') {
        return false;
      }
      if (($event.newData.modeloId != undefined)? $event.newData.modeloId: $event.oldData.modeloId === undefined || ($event.newData.modeloId != undefined)? $event.newData.modeloId: $event.oldData.modeloId === '') {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }
  
  onFilter() {
    this.dataSource = this.ventasList;
    let dataSourceTemp: Ventas[] = [];
    try {
      const initDate = new Date(this.form.get('initDate')?.value);
      const endDate = new Date(this.form.get('endDate')?.value);
      const day = 86400000;
      
      //console.log(`onFilter: ${initDate} to ${endDate}`);
      //console.log(`onFilter: ${initDate.getTime()} to ${endDate.getTime()}`);
      if (this.dataSource.length > 0) {  
        this.dataSource.forEach((item) => {

          const dateItem = new Date(item.fecha);
          //console.log(`forEach: ${dateItem.getTime()}`);

          if (dateItem.getTime() > initDate.getTime() && dateItem.getTime() < endDate.getTime()+day) {
            //console.log(`=> push: ${JSON.stringify(item)}`);
            dataSourceTemp.push(item);
          }
        });
      }
      this.dataSource = dataSourceTemp;
      console.log(``);
    } catch (error) {
    }
  }

  onReset() {
    this.form.reset();
    this.getData();
  }

  onScanImei($event: any) {
  }
}