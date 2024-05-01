import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { LoginComponent } from './shared/components/login/login.component';
import { MaslGuard } from './shared/guards/masl.guard';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent 
  },
  { 
    path: '*', 
    redirectTo: '' 
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AppRoutingModule { }
