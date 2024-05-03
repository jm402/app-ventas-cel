import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasComponent } from './marcas/marcas.component';

const routes: Routes = [
  { 
    path: 'marcas', 
    component: MarcasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
