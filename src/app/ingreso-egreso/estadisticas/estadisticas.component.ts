import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.mode';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [
  ]
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  public ingresos:number = 0;
  public egresos:number = 0;
  public totalIngresos:number = 0;
  public totalEgresos:number = 0;
  /* Chart js */
  public doughnutChartLabels: string[] = [ 'Egresos', 'Ingresos', 'Restante'];
  public graphicData:number[] = [];
  public doughnutChartData: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';
  /* subscription */
  public dataSubs:Subscription;
  constructor(
    private store:Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.dataSubs = this.store.select('ingresosEgresos').subscribe(({items}) =>{
      this.generarEstatistica(items);
    }, err => {
      console.log(err);
    })
  }

  ngOnDestroy(): void {
    this.dataSubs.unsubscribe();
  }

  generarEstatistica(items:IngresoEgreso[]){
    /* reset values */
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.totalEgresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if(item.tipo == 'Ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }
    this.graphicData = [ this.totalEgresos, this.totalIngresos, this.totalIngresos - this.totalEgresos];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.graphicData },
      ]
    };
  }
}
