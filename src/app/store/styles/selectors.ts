import { createFeatureSelector, createSelector } from "@ngrx/store"
import { STYLE_KEY } from "./actions";
import { IState } from "./interfaces";


export const featureSelector = createFeatureSelector<IState>(STYLE_KEY);

export const countSelector = createSelector(
    featureSelector,
    state => state.counter
)

export const generalSelector = createSelector(
    featureSelector,
    state => state.generalStyles
)

export const elementSelector = createSelector(
    featureSelector,
    state => state.elementStyles
)
