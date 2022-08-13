import { createAction, props } from "@ngrx/store";
import { TForm } from "../../shared/types and interfaces/types";
import { StylesActionTypes } from "./styles.enums";
import { ICounter, IElementKey, IElementStyles, IPayloadElement } from "./styles.interfaces";

export const change = createAction(StylesActionTypes.CounterChange, props<ICounter>()); 
export const generalStylesUpdate = createAction(StylesActionTypes.GeneralUpdate, props<TForm>());
export const elementStylesCreate = createAction(StylesActionTypes.ElementCreate, props<IElementStyles>());
export const elementStylesUpdate = createAction(StylesActionTypes.ElementUpdate, props<IPayloadElement>());
export const elementStylesDelete = createAction(StylesActionTypes.ElementDelete, props<IElementKey>());

