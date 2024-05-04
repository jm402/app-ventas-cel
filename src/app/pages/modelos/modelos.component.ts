import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Modelos } from '../../models/modelos.model';
import { ModelosService } from '../../services/modelos.service';
import { MarcasService } from '../../services/marcas.service';
import { Marcas } from '../../models/marcas.model';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.scss'
})
export class ModelosComponent {
  public dataSource:                    Modelos[];
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
  marcasList:                           Marcas[] = [];

  private _service = inject(ModelosService);
  private _MarcasService = inject(MarcasService);

  constructor() {
    this.getData();
    this.getMarcas();
  }

  async getData() {
    this.dataSource = await this._service.get();
  }

  async getMarcas() {
    this.marcasList = await this._MarcasService.get();
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
