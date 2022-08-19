import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userSub:Subscription;

  constructor(
    private store:Store<AppState>,
    private service:IngresoEgresoService
  ) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(user => {
      console.log(user);
      this.service.getIngresosEgresos(user.user.id);
    });
  }

}
