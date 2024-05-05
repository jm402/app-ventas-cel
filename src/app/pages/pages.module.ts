import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MarcasComponent } from './marcas/marcas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxCheckBoxModule, DxListModule, DxSelectBoxModule, DxTemplateModule, DxValidatorModule, DxFormModule, DxTreeListModule } from 'devextreme-angular';
import { ModelosComponent } from './modelos/modelos.component';
import { VentasComponent } from './ventas/ventas.component';


@NgModule({
  declarations: [
    MarcasComponent,
    ModelosComponent,
    VentasComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxCheckBoxModule,
    DxListModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxValidatorModule,
    DxFormModule,
    ReactiveFormsModule,
    FormsModule,
    DxTreeListModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
