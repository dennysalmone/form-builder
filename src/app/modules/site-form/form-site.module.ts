import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSiteRoutingModule } from './form-site.routing.module';
import { FormPageComponent } from './form-page/form-page.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SiteLayoutComponent,
    FormPageComponent,
  ],
  imports: [
    CommonModule,
    FormSiteRoutingModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class FormSiteModule { }
