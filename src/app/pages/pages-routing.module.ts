import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasComponent } from './marcas/marcas.component';
import { ModelosComponent } from './modelos/modelos.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  { 
    path: 'marcas', 
    component: MarcasComponent
  },
  { 
    path: 'modelos', 
    component: ModelosComponent
  },
  { 
    path: 'ventas', 
    component: VentasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
