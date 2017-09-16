import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MdButtonModule,
  MdSnackBarModule,
  MdCardModule,
  MdInputModule,
  MdCheckboxModule,
  MdIconModule,
  MdSidenavModule,
  MdSelectModule,
  MdToolbarModule,
  MdListModule,
  MdProgressBarModule,
  MdProgressSpinnerModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdSnackBarModule,
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdIconModule,
    MdSidenavModule,
    MdSelectModule,
    MdToolbarModule,
    MdListModule,
    MdProgressBarModule,
    MdProgressSpinnerModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MdButtonModule,
    MdSnackBarModule,
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdIconModule,
    MdSidenavModule,
    MdSelectModule,
    MdToolbarModule,
    MdListModule,
    MdProgressBarModule,
    MdProgressSpinnerModule
  ],
})
export class MaterialModule { }
