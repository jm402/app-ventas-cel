import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CONEXION } from '../../conexion';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private httpClient = inject(HttpClient);
  
}
