import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopComponent} from './shop.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'shop' ,pathMatch:'full'},
      {
        path        : 'shop',
        component:   ShopComponent
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
