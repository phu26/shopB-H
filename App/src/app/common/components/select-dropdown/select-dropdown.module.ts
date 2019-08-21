import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDropdownComponent } from './select-dropdown.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextSearchPipe } from 'app/common/pipe/text-search.pipe';

@NgModule({
  declarations: [SelectDropdownComponent, TextSearchPipe],
  imports: [FormsModule, ReactiveFormsModule,
    CommonModule
  ],
  exports: [SelectDropdownComponent]
})
export class SelectDropdownModule { }
