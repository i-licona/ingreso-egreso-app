import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
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

  public crearIngresoEgreso(ingresoEgreso:IngresoEgreso){
    const id = this.authService.user.id;
    delete ingresoEgreso.uid;
    return this.firestore.doc(`/${id}/ingresos-egresos`).collection('items').add({...ingresoEgreso});
  }

  public getIngresosEgresos(id:string):Observable<IngresoEgreso[]>{
    return this.firestore.collection(`${id}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc => ({
            ...doc.payload.doc.data() as any,
            uid:doc.payload.doc.id
        }));
      })
    );
  }

  public borrarIngresoEgreso(idItem:string){
    const id = this.authService.user.id;
    return this.firestore.doc(`${id}/ingresos-egresos/items/${idItem}`).delete();
  }
}
