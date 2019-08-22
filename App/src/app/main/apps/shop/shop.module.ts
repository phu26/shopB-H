import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatTableModule, MatListModule } from '@angular/material';



@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    ShopModule,
    ShopRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSortModule,
    MatTableModule,
    MatListModule,
    RouterModule
  ],
  exports: [ShopComponent]
})
export class ShopModule { }
