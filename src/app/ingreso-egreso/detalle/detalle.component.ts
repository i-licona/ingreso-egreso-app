import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.mode';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  public ingresosEgresos:IngresoEgreso[] = [];
  private ingresoEgresoSub:Subscription;
  constructor(
    private store:Store<AppState>,
    private ingresoEgresoService:IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresoEgresoSub = this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.ingresosEgresos = items;
    });
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSub.unsubscribe();
  }

  borrar(id:string){
    this.ingresoEgresoService.borrarIngresoEgreso(id).then(res => {
      Swal.fire('Exito!','Registro borrado correctamente', 'success');
    }).catch(err => {
      Swal.fire('Error!','Intente nuevamente', 'error');
    });
  }
}
