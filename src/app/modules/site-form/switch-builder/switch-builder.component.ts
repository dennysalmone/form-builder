import { Component, Input, OnInit } from '@angular/core';
import { EInputType } from 'src/app/shared/data/enums';
import { IStyles } from 'src/app/shared/types and interfaces/interfaces';
import { TFormElement } from 'src/app/shared/types and interfaces/types';

@Component({
  selector: 'app-switch-builder',
  templateUrl: './switch-builder.component.html',
  styleUrls: ['./switch-builder.component.scss']
})
export class SwitchBuilderComponent {

  @Input() item: TFormElement;
  @Input() styles: IStyles;
  public inputEnum = EInputType;

}
