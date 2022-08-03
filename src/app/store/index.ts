import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { stylesReducer } from './styles/reducers';
import { IState } from './styles/interfaces';
import { STYLE_KEY } from './styles/actions';

export interface State {
  [STYLE_KEY]: IState;
}

export const reducers: ActionReducerMap<State> = {
  [STYLE_KEY]: stylesReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
