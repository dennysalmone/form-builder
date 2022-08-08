import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { change, generalStylesUpdate, elementStylesCreate, elementStylesUpdate, elementStylesDelete } from 'src/app/store/styles/styles.actions';
import { countSelector, generalSelector, elementSelector } from 'src/app/store/styles/styles.selectors';
import { isColorValidator } from 'src/app/shared/data/validators';
import { EInputType } from '../../../shared/data/enums';
import { CBorders, CFontWeight } from '../../../shared/data/form-builder';
import { FormBuilderService } from '../../../shared/services/form-builder/form-builder.service';
import { TForm, TFormElement } from '../../../shared/types and interfaces/types';
import { IStyles } from 'src/app/shared/types and interfaces/interfaces';
import { IElementStyles, IPayloadElement } from 'src/app/store/styles/styles.interfaces';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})

export class FormPageComponent implements OnInit, OnDestroy {

  public dragSection: string[] = [];
  public dropSection: string[] = [];
  public elementStylesBase: { [key: number]: TFormElement };
  public EInputType = EInputType;
  public generalStylesForm: FormGroup;
  public elementStylesForm: FormGroup;
  public borders = CBorders;
  public fontWeights = CFontWeight;
  public generalFormIsVisible = true;
  public elementFormIsVisible = true;
  public counter: number;
  public generalStyles: TForm;
  public temperature: number;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formService: FormBuilderService,
    private store: Store
    ) {}

  ngOnInit(): void {
    this.dragSection = Object.values(EInputType);
    this.subscribeStore();
    this.setDefaultStyles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeStore (): void {
    this.store.select(countSelector).pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: number) => {
        this.counter = value;
      },
    });
    this.store.select(generalSelector).pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: TForm) => {
        this.generalStyles = value;
      },
    });
    this.store.select(elementSelector).pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: { [key: number]: TFormElement }) => {
        this.elementStylesBase = value;
      },
    });
  }

  setDefaultStyles(): void {
    this.generalStylesForm = new FormGroup({
      label: new FormControl('Form Label', [Validators.required]),
      textColor: new FormControl('#000000', [Validators.required, isColorValidator()]),
      backgroundColor: new FormControl('#ffffff', [Validators.required, isColorValidator()]),
      borderType: new FormControl('solid', [Validators.required]),
      borderColor: new FormControl('#000000', [Validators.required, isColorValidator()]),
    });
    this.elementStylesForm = new FormGroup({
      placeholder: new FormControl('Placeholder', [Validators.required]),
      width: new FormControl('350', [Validators.required]),
      height: new FormControl('40', [Validators.required]),
      fontWeight: new FormControl('400', [Validators.required]),
      fontSize: new FormControl('14', [Validators.required]),
      border: new FormControl('solid', [Validators.required]),
      newField: new FormControl(null),
      required: new FormControl(false),
    });
  }

  dropContentCheck(droppedType: string, index: number): void {
    const element = this.formService.createFormElement(droppedType);
    this.store.dispatch(elementStylesCreate(element));
    const uniqId = Object.keys(element)[0]
    this.dropSection.splice(index, 0, uniqId);
  }

  elementStyles(item: TFormElement): IStyles {
    return {
      color: item.color, 
      width: item.width + 'px',
      height: item.height + 'px',
      fontWeight: item.fontWeight,
      fontSize: item.fontSize + 'px',
      placeholder: item.placeholder,
      borderStyle: item.border
    }
  }

  deleteElement(index: number): void {
    this.dropSection = this.dropSection.filter(arrayItem => +arrayItem !== index);
    this.store.dispatch(elementStylesDelete({key: index}));
  }

  dropped(event: CdkDragDrop<string[]>): void {
    if(event.container.data === this.dragSection) return;
    if(event.previousContainer === event.container) return;
    this.dropContentCheck(event.previousContainer.data[event.previousIndex], event.currentIndex);
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
    const elementStyles: IElementStyles = {[index]: this.elementStylesBase[index]};
    const newElementStyles = JSON.parse(JSON.stringify(elementStyles));
    const formValues = this.elementStylesForm.value;

    if(formValues.newField && formValues.newField.split(',').length) {
      const withoutLongSpaces: string = formValues.newField.split(/\s+/).join(' ');
      const arrayOfOptions: string[] = withoutLongSpaces.split(',');
      const withoutEmptyValues = arrayOfOptions.filter(el => el.split(/\s+/).join('').length);
      newElementStyles[index].options = withoutEmptyValues;
    }

    Object.keys(formValues).forEach(key => {
      if(newElementStyles[index][key]) {
        newElementStyles[index][key] = formValues[key];
      }
    });

    const styleElementWithKey: IPayloadElement = {key: index, obj: newElementStyles};
    this.store.dispatch(elementStylesUpdate(styleElementWithKey)) ;
  }

}


