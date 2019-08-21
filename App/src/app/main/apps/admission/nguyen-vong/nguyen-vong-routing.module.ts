import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachNguyenVongComponent, DanhSachNguyenVongTheoDotComponent } from './danh-sach-nguyen-vong/danh-sach-nguyen-vong.component';
import { NguyenVongComponent } from './nguyen-vong.component';

const routes: Routes = [
  {
    path: '',
    component: NguyenVongComponent,
    children: [
      { path: '', redirectTo:'day-du'},
      { path: 'day-du', component: DanhSachNguyenVongComponent },
      { path: 'theo-dot/:dottuyensinhid', component: DanhSachNguyenVongTheoDotComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NguyenVongRoutingModule { }
