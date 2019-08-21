import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DotXetTuyenComponent } from './dot-xet-tuyen.component';
import { DanhSachDotXetTuyenComponent } from './danh-sach-dot-xet-tuyen/danh-sach-dot-xet-tuyen.component';
import { ThemDotXetTuyenComponent } from './them-dot-xet-tuyen/them-dot-xet-tuyen.component';

const routes: Routes = [{
  path:'',
  component: DotXetTuyenComponent,
  children:[
    {path:'',component:DanhSachDotXetTuyenComponent},
    {path:':id',component:ThemDotXetTuyenComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotXetTuyenRoutingModule { }
