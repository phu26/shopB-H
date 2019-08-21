import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySortPipe } from './array-sort.pipe';

@NgModule({
  declarations: [ArraySortPipe],
  imports: [
    CommonModule
  ]
  ,exports:[ArraySortPipe]
})
export class MainPipeModule { }
