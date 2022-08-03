import { Injectable } from '@angular/core';
import { TForm, TFormElement } from '../types and interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor() { }

  createFormElement (droppedType: string): {[key:number]:TFormElement} { 
    return {
      [this.generateQniqId()]: {
        inputType: droppedType,
        placeholder: `${droppedType} label`,
        color: '#000000',
        width: '350', 
        height: '40',
        required: false,
        border: 'solid',
        fontWeight: '400',
        fontSize: '14px',
        options: []
      }
    }
  }

  generateQniqId(): number {
    return +(Math.random().toString().slice(2));
  }

}
