import { Injectable } from '@angular/core';
import { TForm, TFormElement } from '../types and interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor() { }

  createFormElement (droppedType: string): TFormElement {
    return {
      type: droppedType,
      id: this.generateQniqId(),
      placeholder: `${droppedType} label`,
      color: '#000000',
      width: 200, 
      height: 40,
      required: true,
      border: 'solid',
      fontWeight: 400,
      fontSize: 14,
      options: ['1111', '2222', '3333']
    }
  }

  generateQniqId(): number {
    return +(Math.random().toString().slice(2));
  }

  getGeneralStylesDefaultValues(): TForm {
    return {
      label: 'Form Label',
      textColor: '#000000',
      backgroundColor: '#ffffff',
      borderType: 'solid',
      borderColor: '#000000',
    }
  }

}
