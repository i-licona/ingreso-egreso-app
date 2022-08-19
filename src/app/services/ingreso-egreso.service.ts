import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.mode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore:AngularFirestore,
    private authService:AuthService
  ) {
  }

  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){
    const id = this.authService.user.id;
    return this.firestore.doc(`/${id}/ingresos-egresos`).collection('items').add({...ingresoEgreso});
  }

  getIngresosEgresos(id:string){
    this.firestore.collection(`${id}/ingresos-egresos/items`)
    .valueChanges()
    .subscribe(res =>{
      console.log(res);
    });
  }
}
