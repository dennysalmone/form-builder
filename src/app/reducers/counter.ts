import { createAction, createReducer, on } from "@ngrx/store";

export const change = createAction('[COUNTER] change');

export interface CounterState {
    count: number;
}

export const initialState: CounterState = {
    count: 0
}

export const counterReducer = createReducer(
    initialState,
    on(change, state => ({
        ...state,
        count: state.count + 1
    }))
);