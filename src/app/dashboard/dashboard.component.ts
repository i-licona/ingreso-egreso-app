import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userSub:Subscription;
  private inegSub:Subscription;
  constructor(
    private store:Store<AppState>,
    private service:IngresoEgresoService
  ) { }
  ngOnInit(): void {
    this.userSub = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(({user}) => {
      this.inegSub = this.service.getIngresosEgresos(user.id).subscribe(data => {
        this.store.dispatch(setItems({items: data}))
      });
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.inegSub?.unsubscribe();
  }

}
