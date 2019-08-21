import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThiSinhComponent } from './thi-sinh.component';
import { ThiSinhItemComponent } from './thi-sinh-item/thi-sinh-item.component';
import { DanhSachThiSinhComponent } from './danh-sach-thi-sinh/danh-sach-thi-sinh.component';
import { DoiMatKhauComponent } from './doi-mat-khau/doi-mat-khau.component';

const routes: Routes = [{
  path: '',
  component: ThiSinhComponent,
  children: [
    {path: '', component: DanhSachThiSinhComponent},
    {path: 'thong-tin-thi-sinh', component: ThiSinhItemComponent},
    { path: 'doi-mat-khau', component: DoiMatKhauComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThiSinhRoutingModule { }
