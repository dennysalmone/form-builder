import { TForm, TFormElement } from "../../shared/types and interfaces/types";

export interface IState {
    counter: number;
    generalStyles: TForm;
    elementStyles: {[key:number]:TFormElement}
}

export interface ICounter {
    id: number
}

export interface IElementStyles { 
    [key: number]: TFormElement
}

export interface IPayloadElement {
    obj: IElementStyles,
    key: number
}

export interface IElementKey {
    key: number
}