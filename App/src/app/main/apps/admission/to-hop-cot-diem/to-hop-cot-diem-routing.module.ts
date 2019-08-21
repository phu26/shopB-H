import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToHopCotDiemComponent } from './to-hop-cot-diem.component';
import { DanhSachToHopCotDiemComponent, DanhSachToHopCotDiemModalComponent } from './danh-sach-to-hop-cot-diem/danh-sach-to-hop-cot-diem.component';
import { ChiTietToHopCotDiemComponent } from './chi-tiet-to-hop-cot-diem/chi-tiet-to-hop-cot-diem.component';


const routes: Routes = [
  {
    path: '',
    component: ToHopCotDiemComponent,
    children: [
      { path: '', component: DanhSachToHopCotDiemComponent },
      { path: ':id', component: ChiTietToHopCotDiemComponent }
      // ,
      // { path: 'chi-tiet-dot-tuyen-sinh', component: D }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToHopCotDiemRoutingModule { }

