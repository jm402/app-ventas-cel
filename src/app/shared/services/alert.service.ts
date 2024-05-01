import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
  ) { }

  // Swal de confirmación
  Confirm(type: any, title: any, text: any) {

    return new Promise((resolve, reject) => {
      var res = Swal.fire({
        position: 'center',
        title: title.toUpperCase(),
        text: text,
        icon: type,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#FF002B',
        cancelButtonColor: '#C4C4C4',
        confirmButtonText: 'ACEPTAR',
        cancelButtonText: 'CANCELAR',
        allowOutsideClick: false,
      });
      resolve(res);
    })
  }


  //En caso de imprmir Swal [Cancelar][Imprimir]
  Download( title: any, text: any) {

    return new Promise((resolve, reject) => {
      var res = Swal.fire({
        position: 'center',
        title: title.toUpperCase(),
        text: text,
        icon: 'info',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#46D124',
        cancelButtonColor: '#C4C4C4',
        confirmButtonText: 'DESCARGAR',
        cancelButtonText: 'CANCELAR',
        allowOutsideClick: false,
      });
      resolve(res);
    })
  }

  //simple Swal [Aceptar]
  Alert(type?: any, title?: any, text?: any) {

    return new Promise((resolve, reject) => {
      var res = Swal.fire({
        position: 'center',
        icon: type,
        title: title.toUpperCase(),
        text: text,
        confirmButtonText: 'ACEPTAR',
        confirmButtonColor: '#FF002B',
        showConfirmButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
      });
      resolve(res);
    }
    );
  }


  // extra simple sin botones
  Dialog(type: any, title: any , text: any ) {

    return new Promise((resolve, reject) => {
      var res = Swal.fire({
        position: 'center',
        icon: type,
        title: title.toUpperCase(),
        text: text,
        confirmButtonText: 'ACEPTAR',
        confirmButtonColor: '#FF002B',
        showConfirmButton: false,
        width: 400,
        timer: 2500,
      });
      resolve(res);
    });
  }


//estar completamente seguro, doble confirmacion
  VerifyConfirm(type: any, title :any, text: any) {
    return new Promise(async (resolve, reject) => {
      var res = await Swal.fire({
        title: title.toUpperCase() || '¿ESTAS SEGURO?',
        icon: type,
        position: 'center',
        input: 'checkbox',
        // inputValue: accept,
        inputPlaceholder:
            'Estoy de acuerdo en <strong>'+text+'</strong>.',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#FF2946',
        cancelButtonColor: '#C4C4C4',
        confirmButtonText: 'ACEPTAR',
        cancelButtonText: 'CANCELAR',
        allowOutsideClick: false,
        preConfirm : (value) => {
          if (!value) {
            Swal.showValidationMessage(
              ' Usted debe estar de acuerdo.'
            );
          }
        }
      });
      resolve(res);
    });
  }
}
