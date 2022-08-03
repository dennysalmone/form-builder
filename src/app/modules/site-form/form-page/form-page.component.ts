import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { change, generalStylesUpdate, elementStylesCreate, elementStylesUpdate, elementStylesDelete } from 'src/app/store/styles/actions';
import { countSelector, generalSelector, elementSelector } from 'src/app/store/styles/selectors';
import { isColorValidator } from 'src/app/shared/data/validators';
import { EInputType } from '../../../shared/data/enums';
import { CBorders, CFontWeight } from '../../../shared/data/form-builder';
import { FormBuilderService } from '../../../shared/services/form-builder.service';
import { TForm, TFormElement } from '../../../shared/types and interfaces/types';
import { IStyles } from 'src/app/shared/types and interfaces/interfaces';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})

export class FormPageComponent implements OnInit, OnDestroy {

  public dragSection: string[] = [];
  public dropSection: number[] = [];
  public elementStylesBase: { [key: number]: TFormElement };
  public inputEnum = EInputType;
  public generalStylesForm: FormGroup;
  public elementStylesForm: FormGroup;
  public borders = CBorders;
  public fontWeights = CFontWeight;
  public generalFormIsVisible = true;
  public elementFormIsVisible = true;
  public counter: number;
  public generalStyles: TForm;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formService: FormBuilderService,
    private store: Store
    ) {}

  ngOnInit(): void {
    this.dragSection = Object.values(EInputType);
    this.subscribeStore();
    
    this.generalStylesForm = new FormGroup({
      label: new FormControl('Form Label', [Validators.required]),
      textColor: new FormControl('#000000', [Validators.required, isColorValidator()]),
      backgroundColor: new FormControl('#ffffff', [Validators.required, isColorValidator()]),
      borderType: new FormControl('solid', [Validators.required]),
      borderColor: new FormControl('#000000', [Validators.required, isColorValidator()]),
    });
    this.elementStylesForm = new FormGroup({
      label: new FormControl('Placeholder', [Validators.required]),
      width: new FormControl('350', [Validators.required]),
      height: new FormControl('40', [Validators.required]),
      fontWeight: new FormControl('400', [Validators.required]),
      fontSize: new FormControl('14', [Validators.required]),
      borderStyle: new FormControl('solid', [Validators.required]),
      newField: new FormControl(''),
      required: new FormControl(false),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeStore (): void {
    this.store.select(countSelector).pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: number) => {
        this.counter = value
      },
    })
    this.store.select(generalSelector).pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: TForm) => {
        this.generalStyles = value
      },
    })
    this.store.select(elementSelector).pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: { [key: number]: TFormElement }) => {
        this.elementStylesBase = value
      },
    })
  }

  dropContentCheck(droppedType: string, index: number): void {
    const element = this.formService.createFormElement(droppedType);
    this.store.dispatch(elementStylesCreate(element));
    const uniqId = Object.keys(element)[0]
    this.dropSection.splice(index, 0, +uniqId);
  }

  elementStyles(item: TFormElement): IStyles {
    return {
      'color': item.color, 
      'width': item.width + 'px',
      'height': item.height + 'px',
      'font-weight': item.fontWeight,
      'font-size': item.fontSize + 'px',
      'placeholder': item.placeholder,
      'border-style': item.border
    }
  } // for NgStyles

  deleteElement(index: number) {
    this.dropSection = this.dropSection.filter(arrayItem => arrayItem !== index);
    this.store.dispatch(elementStylesDelete({key: index}));
  }

  dropped(event: CdkDragDrop<any>): void {
    if(event.container.data === this.dragSection) return;
    if(event.previousContainer === event.container) return;
    this.dropContentCheck(event.previousContainer.data[event.previousIndex], event.currentIndex)
  }

  changeCounter(id: number): void {
    if(this.counter === id) return;
    this.store.dispatch(change({id}));
  }

  setGeneralToState(genStyles: TForm): void {
    this.store.dispatch(generalStylesUpdate(genStyles));
  }

  toggleGeneralStylesForm(): void {
    this.generalFormIsVisible = !this.generalFormIsVisible;
  }

  toggleElementStylesForm(): void {
    this.elementFormIsVisible = !this.elementFormIsVisible;
  }

  onGeneralSubmit(): void {
    this.store.dispatch(generalStylesUpdate(this.generalStylesForm.value)); 
  }

  onElementSubmit(index: number): void {
    const state: { [key: number]: TFormElement } = {[index]: JSON.parse(JSON.stringify(this.elementStylesBase[index]))}
    const formValues = this.elementStylesForm.value

    state[index].placeholder = formValues.label;
    state[index].width = formValues.width;
    state[index].height = formValues.height;
    state[index].fontSize = formValues.fontSize;
    state[index].fontWeight = formValues.fontWeight;
    state[index].border = formValues.borderStyle;
    state[index].required = formValues.required;
    state[index].options = formValues.newField.split(',');

    this.store.dispatch(elementStylesUpdate(state)) 

  }

}


