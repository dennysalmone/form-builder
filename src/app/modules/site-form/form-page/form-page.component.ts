import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { change } from 'src/app/reducers/counter';

import { EInputType } from '../../../shared/data/enums';
import { CBorders } from '../../../shared/data/form-builder';
import { FormBuilderService } from '../../../shared/services/form-builder.service';
import { TForm, TFormElement } from '../../../shared/types and interfaces/types';


@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  dragSection: string[] = [];
  dropSection: TFormElement[] = [];
  inputEnum = EInputType;
  idFormStyles: number = 0;
  generalStylesForm: FormGroup;
  elementStylesForm: FormGroup;
  borders = CBorders;
  generalFormIsVisible = true;
  formIsVisible = true;
  generalStyles: TForm = this.formService.getGeneralStylesDefaultValues();

  constructor(
    private formService: FormBuilderService,
    private store: Store
    ) {}

  ngOnInit(): void {
    this.dragSection = Object.values(EInputType)
    this.generalStylesForm = new FormGroup({
      label: new FormControl('Form Label', [Validators.required]),
      textColor: new FormControl('#000000', [Validators.required]),
      backgroundColor: new FormControl('#ffffff', [Validators.required]),
      borderType: new FormControl('solid', [Validators.required]),
      borderColor: new FormControl('#000000', [Validators.required]),
    });
    this.elementStylesForm = new FormGroup({
      label: new FormControl('Form Label', [Validators.required]),

    });
  }

  dropContentCheck(droppedType: string, index: number): void {
    const element = this.formService.createFormElement (droppedType)
    this.dropSection.splice(index, 0, element);
  }

  clearGeneralStylesForm(): void {
    this.generalStylesForm.setValue(this.formService.getGeneralStylesDefaultValues());
  }

  setIdFormStyles (index: number): void {
    this.idFormStyles = index;
  }

  elementStyles (item: TFormElement): object {
    return {
      'color': item.color, 
      'width': item.width + 'px',
      'height': item.height + 'px',
      'font-weight': item.fontWeight,
      'font-size': item.fontSize + 'px',
      'border-style': item.border
    }
  }
  
  dropped(event: CdkDragDrop<any[]>): void {
    if(event.container.data === this.dragSection) return;
    if(event.previousContainer === event.container) return;
    this.dropContentCheck(event.previousContainer.data[event.previousIndex], event.currentIndex)
  }

  onClick(item: TFormElement, i: number): void {
    this.setIdFormStyles(i);
    this.store.dispatch(change())
    // нужно создать функцию, которая выведет редактирование стилей для конкретного инпута
  }

  toggleGeneralStylesForm(): void {
    this.generalFormIsVisible = !this.generalFormIsVisible;
  }

  onSubmit(): void {
    this.generalStyles = this.generalStylesForm.value
    this.clearGeneralStylesForm();
  }

}
