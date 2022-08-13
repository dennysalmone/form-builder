import { createFeatureSelector, createSelector } from "@ngrx/store"
import { STYLE_KEY } from "./styles.enums";
import { IState } from "./styles.interfaces";


export const globalSelector = createFeatureSelector<IState>(STYLE_KEY);

export const countSelector = createSelector(
    globalSelector,
    state => state.counter
)

export const generalSelector = createSelector(
    globalSelector,
    state => state.generalStyles
)

export const elementSelector = createSelector(
    globalSelector,
    state => state.elementStyles
)
