import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent {
  public dataSource:                    any[];
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


}
