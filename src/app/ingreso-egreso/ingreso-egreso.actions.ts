import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.mode';

export const setItems = createAction('[IngresoEgreso] Set items',
  props<{items: IngresoEgreso[]}>()
);

export const unSetItems = createAction('[IngresoEgreso] Un set items');
