import { createAction, props } from '@ngrx/store';
import { FbUser } from '../models/user.model';

export const setUser = createAction(
'[Auth] setUser',
  props<{user:FbUser}>()
);

export const unSetUser = createAction('[Auth] unSetUser');

