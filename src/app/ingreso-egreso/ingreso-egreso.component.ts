import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.mode';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public mainForm:FormGroup;
  public tipo:string = 'Ingreso';
  public loadding:boolean = true;
  public subscriptionLoadding:Subscription;
  constructor(
    private formBuilder:FormBuilder,
    private service:IngresoEgresoService,
    private store:Store<AppState>
  ) {
    this.mainForm = this.formBuilder.group({
      descripcion:[null,Validators.required],
      monto:[null,Validators.required],
      tipo:[this.tipo,Validators.required],
      /* uid:[null,Validators.required], */
    });
  }
  ngOnDestroy(): void {
    this.subscriptionLoadding.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptionLoadding = this.store.select('ui').subscribe(({isLoading}) => {
      this.loadding = isLoading;
    });
  }

  guardar(){
    this.store.dispatch(isLoading());
    const {monto, descripcion, tipo} = this.mainForm.value;
    const ingresoEgreso:IngresoEgreso = {
      monto:monto,
      descripcion:descripcion,
      tipo:tipo
    };
    this.service.crearIngresoEgreso(ingresoEgreso).then((ref) =>{
      Swal.fire('Exito!', 'Documento agregado correctamente', 'success');
      this.store.dispatch(stopLoading());
      this.mainForm.reset();
    })
    .catch(err => {
      Swal.fire('Error!', 'Ocurrio un error, intente nuevamente', 'error');
      this.store.dispatch(stopLoading());
    });
  }

  tipoMovimiento(tipo:string){
    this.tipo = tipo;
    this.mainForm.patchValue({tipo:this.tipo});
  }
}
