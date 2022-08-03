import { createAction, props } from "@ngrx/store";
import { TForm } from "../../shared/types and interfaces/types";
import { ICounter, IElementKey, IElementStyles } from "./interfaces";

export const STYLE_KEY = 'styles';

export const change = createAction('[COUNTER] change', props<ICounter>()); 
export const generalStylesUpdate = createAction('[GENERAL] update', props<TForm>());
export const elementStylesCreate = createAction('[ELEMENT] create', props<IElementStyles>());
export const elementStylesUpdate = createAction('[ELEMENT] update', props<IElementStyles>());
export const elementStylesDelete = createAction('[ELEMENT] delete', props<IElementKey>());