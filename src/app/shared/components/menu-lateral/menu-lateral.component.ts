import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {
  categorias: any;
  vchCorreoDalton: string;
  
  private _AuthService = inject(AuthService);
  private _MenuService = inject(MenuService);

  constructor() {}

  ngOnInit(): void {
    this.getUser();
    this.getData();
  }

  getData() {
  }

  getUser() {
    this.vchCorreoDalton = this._AuthService.getUserEmail();
  }

  fixRoutes(menus: any[], fixRoute = '/pages/'): any[] {
    if (menus.length > 0) {
      menus.forEach((menu) => {
        menu.vchUrl = fixRoute + menu.vchUrl;
        //console.debug(`${menu.vchPadre} - ${menu.vchUrl}`);
        menu.menus = this.fixRoutes(menu.menus, `${menu.vchUrl}/`);
      });
    }
    return menus;
  }

  toggleCategoria(categoria: any): void {
    categoria.expandida = !categoria.expandida;
  }
}
